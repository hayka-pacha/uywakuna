# Déploiement du site Uywakuna sur AWS S3

Ce guide explique comment déployer le site statique Uywakuna sur AWS S3 avec CloudFront pour la distribution CDN.

## 📋 Prérequis

- Un compte AWS actif
- AWS CLI installé et configuré (`asl` pour l'authentification selon vos préférences)
- Node.js 18+ installé
- Le projet Uywakuna mis à jour avec les dernières versions

## 🏗️ Architecture

```
┌─────────────────┐
│   Navigateur    │
└────────┬────────┘
         │
    ┌────▼──────┐
    │ CloudFront │ (CDN + HTTPS)
    └────┬───────┘
         │
   ┌─────▼──────┐
   │ S3 Bucket  │ (Site statique)
   └────────────┘
```

## 🚀 Étape 1 : Build du site statique

### 1.1 Configuration de l'environnement

Créez un fichier `.env.local` avec vos variables Sanity :

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-03-25
SANITY_STUDIO_PROJECT_ID=your_project_id
```

### 1.2 Build du projet

```bash
# Installer les dépendances
npm install

# Générer le site statique
npm run build
```

Le site statique sera généré dans le dossier `out/`.

### 1.3 Vérification du build

```bash
# Tester localement
npx serve out

# Le site sera accessible sur http://localhost:3000
```

## ☁️ Étape 2 : Configuration d'AWS S3

### 2.1 Créer un bucket S3

```bash
# Se connecter à AWS
asl  # Votre commande d'authentification AWS

# Créer le bucket (remplacer uywakuna-blog par votre nom)
aws s3 mb s3://uywakuna-blog --region us-east-1
```

### 2.2 Configurer le bucket pour l'hébergement web

```bash
# Activer l'hébergement de site web statique
aws s3 website s3://uywakuna-blog \
  --index-document index.html \
  --error-document 404.html
```

### 2.3 Politique de bucket pour accès public

Créez un fichier `bucket-policy.json` :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::uywakuna-blog/*"
    }
  ]
}
```

Appliquez la politique :

```bash
aws s3api put-bucket-policy \
  --bucket uywakuna-blog \
  --policy file://bucket-policy.json
```

## 📤 Étape 3 : Déploiement sur S3

### 3.1 Upload des fichiers

```bash
# Synchroniser le dossier out/ avec S3
aws s3 sync out/ s3://uywakuna-blog \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "sitemap.xml" \
  --exclude "robots.txt"

# Upload des fichiers HTML avec cache plus court
aws s3 sync out/ s3://uywakuna-blog \
  --exclude "*" \
  --include "*.html" \
  --include "sitemap*.xml" \
  --include "robots.txt" \
  --cache-control "public, max-age=3600, must-revalidate"
```

### 3.2 Script de déploiement automatisé

Créez un fichier `deploy-s3.sh` :

```bash
#!/bin/bash

set -e

echo "🏗️  Building site..."
npm run build

echo "☁️  Deploying to S3..."
aws s3 sync out/ s3://uywakuna-blog \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "sitemap*.xml" \
  --exclude "robots.txt"

aws s3 sync out/ s3://uywakuna-blog \
  --exclude "*" \
  --include "*.html" \
  --include "sitemap*.xml" \
  --include "robots.txt" \
  --cache-control "public, max-age=3600, must-revalidate"

echo "✅ Deployment completed!"
echo "🌐 Site URL: http://uywakuna-blog.s3-website-us-east-1.amazonaws.com"
```

Rendez-le exécutable :

```bash
chmod +x deploy-s3.sh
```

## 🌐 Étape 4 : Configuration de CloudFront (Recommandé)

### 4.1 Créer une distribution CloudFront

```bash
# Créez un fichier cloudfront-config.json
cat > cloudfront-config.json << 'EOF'
{
  "CallerReference": "uywakuna-$(date +%s)",
  "Comment": "Uywakuna Blog CDN",
  "Enabled": true,
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-uywakuna-blog",
        "DomainName": "uywakuna-blog.s3.us-east-1.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultRootObject": "index.html",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-uywakuna-blog",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "Compress": true,
    "MinTTL": 0,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "PriceClass": "PriceClass_100",
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true
  }
}
EOF

# Créer la distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

### 4.2 Invalidation du cache CloudFront

Après chaque déploiement, invalidez le cache :

```bash
# Récupérer l'ID de distribution
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='Uywakuna Blog CDN'].Id" \
  --output text)

# Invalider le cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

## 🔧 Étape 5 : Configuration du domaine personnalisé

### 5.1 Obtenir un certificat SSL (ACM)

```bash
# Demander un certificat (doit être dans us-east-1 pour CloudFront)
aws acm request-certificate \
  --domain-name uywakuna.info \
  --subject-alternative-names www.uywakuna.info \
  --validation-method DNS \
  --region us-east-1
```

### 5.2 Configurer Route 53

```bash
# Créer une zone hébergée
aws route53 create-hosted-zone \
  --name uywakuna.info \
  --caller-reference $(date +%s)

# Ajouter un enregistrement A pointant vers CloudFront
# (Utilisez la console AWS ou un fichier JSON pour cette étape)
```

## 📊 Étape 6 : Surveillance et logs

### 6.1 Activer les logs S3

```bash
aws s3api put-bucket-logging \
  --bucket uywakuna-blog \
  --bucket-logging-status '{
    "LoggingEnabled": {
      "TargetBucket": "uywakuna-blog-logs",
      "TargetPrefix": "s3-access-logs/"
    }
  }'
```

### 6.2 Activer les logs CloudFront

Dans la console AWS CloudFront, activez les logs standard.

## 🔄 Workflow de mise à jour

### Mise à jour du contenu

1. **Modifier le contenu dans Sanity Studio**
   - Accédez à `/studio` en développement local
   - Ou hébergez le studio séparément sur Vercel

2. **Rebuild et redéploiement**
   ```bash
   ./deploy-s3.sh
   ```

3. **Invalider le cache CloudFront**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id $DISTRIBUTION_ID \
     --paths "/*"
   ```

### Automatisation avec GitHub Actions

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
        NEXT_PUBLIC_SANITY_DATASET: production
        NEXT_PUBLIC_SANITY_API_VERSION: 2023-03-25
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to S3
      run: |
        aws s3 sync out/ s3://uywakuna-blog \
          --delete \
          --cache-control "public, max-age=31536000, immutable" \
          --exclude "*.html" \
          --exclude "sitemap*.xml" \
          --exclude "robots.txt"
        
        aws s3 sync out/ s3://uywakuna-blog \
          --exclude "*" \
          --include "*.html" \
          --include "sitemap*.xml" \
          --include "robots.txt" \
          --cache-control "public, max-age=3600, must-revalidate"
    
    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

## 💰 Estimation des coûts

### S3 Storage
- 1 GB de stockage : ~0,023 $/mois
- 10 000 requêtes GET : ~0,004 $

### CloudFront
- 1 GB de transfert : ~0,085 $ (vers l'Europe/US)
- 10 000 requêtes HTTPS : ~0,01 $

### Coût estimé mensuel pour un blog de 5 GB avec 100k visiteurs/mois
- **~20-30 $/mois**

## ⚠️ Limitations de l'export statique

### Fonctionnalités désactivées

- ❌ **Sanity Studio** : Ne peut pas être exporté statiquement
  - **Solution** : Hébergez le studio séparément sur Vercel
  - URL : `https://uywakuna-studio.vercel.app/studio`

- ❌ **Pagination dynamique** : Limitée à la première page
  - **Solution** : Générer toutes les pages de pagination statiquement

- ❌ **Recherche en temps réel** : Nécessite un backend
  - **Solution** : Utilisez Algolia ou une autre solution de recherche

- ❌ **Aperçu en temps réel** : Le contenu Sanity est figé au moment du build
  - **Solution** : Configurez des webhooks Sanity pour rebuild automatiquement

## 🔐 Sécurité

### Headers de sécurité recommandés

Ajoutez ces headers dans CloudFront (Lambda@Edge) :

```javascript
exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    headers['strict-transport-security'] = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains'
    }];
    headers['x-content-type-options'] = [{
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    }];
    headers['x-frame-options'] = [{
        key: 'X-Frame-Options',
        value: 'DENY'
    }];

    callback(null, response);
};
```

## 📚 Ressources complémentaires

- [Documentation Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Sanity Webhooks](https://www.sanity.io/docs/webhooks)

## 🆘 Dépannage

### Erreur 403 sur certaines pages

**Problème** : CloudFront renvoie 403 pour les routes avec trailing slash.

**Solution** : Configurez CloudFront pour utiliser une Lambda@Edge qui ajoute `index.html` :

```javascript
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    if (request.uri.endsWith('/')) {
        request.uri += 'index.html';
    } else if (!request.uri.includes('.')) {
        request.uri += '/index.html';
    }
    callback(null, request);
};
```

### Images non optimisées

**Problème** : Les images Sanity ne sont pas optimisées.

**Solution** : Les images sont servies directement depuis Sanity CDN (`cdn.sanity.io`), qui gère l'optimisation.

### Le studio ne fonctionne pas

**Problème** : Le studio Sanity n'est pas accessible sur le site statique.

**Solution** : Hébergez le studio séparément :

1. Créez un nouveau projet Next.js dédié au studio
2. Déployez-le sur Vercel
3. Configurez les CORS dans Sanity

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] Build réussi localement
- [ ] Bucket S3 créé et configuré
- [ ] Politique de bucket appliquée
- [ ] Fichiers uploadés sur S3
- [ ] CloudFront configuré (optionnel mais recommandé)
- [ ] Certificat SSL obtenu et appliqué
- [ ] Domaine personnalisé configuré
- [ ] DNS configuré dans Route 53
- [ ] Logs activés
- [ ] Studio hébergé séparément
- [ ] Webhooks Sanity configurés pour rebuild auto

---

**Fait avec ❤️ pour Uywakuna Blog**

