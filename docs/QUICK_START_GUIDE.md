# 🚀 Guide Rapide - Uywakuna Blog

## 📋 Table des matières

1. [Gérer le contenu](#-gérer-le-contenu)
2. [Uploader des images](#-uploader-des-images)
3. [Déployer sur AWS S3](#-déployer-sur-aws-s3)
4. [Troubleshooting](#-troubleshooting)

---

## 📝 Gérer le contenu

### Accéder à Sanity Studio

**En développement :**
```bash
npm run dev
```
Puis : `http://localhost:3000/studio`

**En production :**
`https://uywakuna.info/studio`

### Remplir la page About

1. **Studio** → **"About Page"**
2. Remplir les champs :
   - **Titre ES** : "Sobre Uywakuna"
   - **Titre FR** : "À propos d'Uywakuna"
   - **Sous-titre ES/FR** : Votre description
   - **Contenu ES/FR** : Votre texte principal
3. **Publish** ✅

> 📖 Guide complet : [`docs/ABOUT_PAGE_GUIDE.md`](docs/ABOUT_PAGE_GUIDE.md)

### Créer un article

1. **Studio** → **"Posts"** → **Create**
2. Remplir :
   - Titre (ES et FR)
   - Slug (ES et FR)
   - Excerpt/extrait (ES et FR)
   - Image principale
   - Contenu (ES et FR)
   - Catégorie
   - Auteur
3. **Publish** ✅

---

## 🖼️ Uploader des images

### Méthode simple

1. **Studio** → Ouvrir un document (Article, Auteur, etc.)
2. Trouver le champ **"Image"** ou **"Main Image"**
3. **Cliquer sur "Upload"** ou **glisser-déposer** votre image
4. **Ajuster le hotspot** (point focal) si nécessaire
5. **Publish**

### Formats recommandés

| Type | Résolution | Poids max | Format |
|------|-----------|-----------|---------|
| **Article** | 1920×1080 | 2-3 MB | JPEG |
| **Auteur** | 800×800 | 500 KB | JPEG/PNG |
| **About** | 800×800 | 500 KB | JPEG/PNG |

### Optimiser vos images avant upload

- **En ligne** : [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
- **Photoshop** : "Enregistrer pour le web"
- **Mac** : [ImageOptim](https://imageoptim.com/)

> 📖 Guide complet : [`docs/SANITY_IMAGE_UPLOAD_GUIDE.md`](docs/SANITY_IMAGE_UPLOAD_GUIDE.md)

---

## 🚀 Déployer sur AWS S3

### Prérequis

1. **Compte AWS** avec un bucket S3 configuré
2. **AWS CLI** installé et configuré
3. **Variables d'environnement** configurées (voir `.env.local.example`)

### Build et déploiement

```bash
# 1. Build du site statique
npm run build

# 2. Déployer vers S3 (remplacez YOUR-BUCKET-NAME)
./scripts/deploy-s3.sh YOUR-BUCKET-NAME

# 3. (Optionnel) Invalider le cache CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR-DISTRIBUTION-ID \
  --paths "/*"
```

### Variables d'environnement nécessaires

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=votre-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_STUDIO_PROJECT_ID=votre-project-id
SANITY_REVALIDATE_SECRET=votre-secret
```

> 📖 Guide complet : [`docs/DEPLOYMENT_S3.md`](docs/DEPLOYMENT_S3.md)

---

## 🛠️ Troubleshooting

### L'image n'apparaît pas sur le site

1. Vérifiez que vous avez **publié** dans Sanity (bouton "Publish")
2. **Rebuild** le site : `npm run build`
3. **Redéployez** : `./scripts/deploy-s3.sh YOUR-BUCKET-NAME`
4. Attendez quelques minutes pour la propagation du cache

### Le contenu About ne s'affiche pas

1. Allez dans **Studio** → **"About Page"**
2. Vérifiez que **tous les champs requis** sont remplis (ES et FR)
3. Cliquez sur **"Publish"**
4. Rebuild et redéployez

### L'upload d'image échoue

**Causes possibles :**
- ❌ Fichier trop lourd → Compressez (max 10 MB)
- ❌ Format non supporté → Utilisez JPEG ou PNG
- ❌ Connexion lente → Réessayez

### Build failed

```bash
# Nettoyez le cache et réinstallez
rm -rf .next out node_modules
npm install
npm run build
```

### Le site est lent

1. **Optimisez les images** (voir section "Uploader des images")
2. **Configurez CloudFront** pour la CDN (voir guide déploiement)
3. **Vérifiez que `output: 'export'`** est dans `next.config.js`

---

## 📚 Documentation complète

| Guide | Description |
|-------|-------------|
| [`ABOUT_PAGE_GUIDE.md`](docs/ABOUT_PAGE_GUIDE.md) | Comment remplir la page About |
| [`SANITY_IMAGE_UPLOAD_GUIDE.md`](docs/SANITY_IMAGE_UPLOAD_GUIDE.md) | Comment uploader des images |
| [`DEPLOYMENT_S3.md`](docs/DEPLOYMENT_S3.md) | Déploiement AWS S3 complet |
| [`ABOUT_PAGE_UI_IMPROVEMENTS.md`](docs/ABOUT_PAGE_UI_IMPROVEMENTS.md) | Détails des améliorations UI |
| [`AUTHOR_REMOVAL_SUMMARY.md`](docs/AUTHOR_REMOVAL_SUMMARY.md) | Suppression des pages auteurs |
| [`CHANGELOG.md`](CHANGELOG.md) | Historique des changements |

---

## 🔧 Commandes utiles

```bash
# Développement local
npm run dev                    # Lance le serveur (localhost:3000)

# Build et test
npm run build                  # Build du site statique
npm run start                  # Teste le build en local

# Déploiement
./scripts/deploy-s3.sh BUCKET  # Déploie sur S3

# Maintenance
npm run lint                   # Vérifie le code
npm run format                 # Formate le code (Prettier)
```

---

## 🌐 URLs importantes

- **Site en local** : `http://localhost:3000`
- **Sanity Studio (local)** : `http://localhost:3000/studio`
- **Sanity Studio (prod)** : `https://uywakuna.info/studio`
- **Sanity Dashboard** : `https://sanity.io/manage`

---

## ⚡ Workflow rapide : Publier un article

```bash
# 1. Créer l'article dans Studio
/studio → Posts → Create

# 2. Remplir tous les champs (ES et FR)
- Titre, Slug, Image, Contenu, Catégorie, Auteur

# 3. Publish dans Sanity
Bouton "Publish" en haut à droite

# 4. Build
npm run build

# 5. Déployer
./scripts/deploy-s3.sh YOUR-BUCKET-NAME

# 6. ✅ Article en ligne !
```

---

## 🎨 Personnalisation

### Modifier les couleurs

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#10b981',  // Vert principal
        secondary: '#3b82f6' // Bleu secondaire
      }
    }
  }
}
```

### Modifier la typo

```javascript
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      // Ajoutez votre font
    }
  }
}
```

---

## 🆘 Besoin d'aide ?

1. **Consultez les logs** :
   - Console navigateur (F12)
   - Terminal de build
   - Sanity Studio console

2. **Vérifiez la documentation** :
   - Dossier `/docs`
   - Ce guide

3. **Commandes de debug** :
   ```bash
   # Voir les erreurs détaillées
   npm run build -- --debug
   
   # Tester sans cache
   rm -rf .next && npm run dev
   ```

---

## ✅ Checklist avant déploiement

- [ ] Toutes les images sont optimisées
- [ ] Contenu About rempli (ES et FR)
- [ ] Articles publiés dans Sanity
- [ ] Variables d'environnement configurées
- [ ] Build local réussi (`npm run build`)
- [ ] Site testé en local
- [ ] Credentials AWS configurés
- [ ] Bucket S3 prêt
- [ ] CloudFront configuré (optionnel mais recommandé)

---

**Version :** 3.0.0  
**Next.js :** 16.0.1  
**React :** 19.2.0  
**Sanity :** v4.13.0  
**TypeScript :** 5.9.3

**Dernière mise à jour :** 2025-11-05

