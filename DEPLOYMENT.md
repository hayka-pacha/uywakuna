# Guide de Déploiement - Uywakuna Blog

## Déploiement sur Vercel (Recommandé)

### Prérequis
- Un compte GitHub avec ton code
- Un compte Vercel (gratuit)
- Ton projet Sanity configuré

### Étapes

1. **Prépare ton repo GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Va sur [vercel.com](https://vercel.com)**
   - Connecte-toi avec GitHub
   - Clique sur "Add New Project"
   - Sélectionne ton repo

3. **Configure les variables d'environnement**
   
   Dans les settings Vercel, ajoute:
   
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=3pi0sxz7
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-03-25
   SANITY_REVALIDATE_SECRET=ton-secret-ici
   NEXT_PUBLIC_SITE_URL=https://ton-domaine.vercel.app
   NEXT_PUBLIC_DEFAULT_LOCALE=es
   ```

4. **Deploy!**
   - Clique sur "Deploy"
   - Attends 2-3 minutes
   - Ton site sera en ligne!

### Déployer Sanity Studio

Tu as deux options:

#### Option A: Sur Vercel (même domaine)
Le Studio est déjà inclus à `/studio` - rien à faire!

#### Option B: Sur Sanity.studio (séparé)
```bash
cd stablo-free
npm run sanity deploy
```

## Optimisations de Performance

### Déjà activées ✅
- CDN Sanity en production
- Revalidation ISR (60 secondes)
- Optimisation automatique des images Next.js
- Compression automatique

### Recommandations supplémentaires

1. **Optimise tes images dans Sanity**
   - Utilise des images < 2MB
   - Format WebP recommandé
   - Dimensions max: 2000px

2. **Active le cache navigateur**
   - Déjà configuré dans Next.js

3. **Utilise un domaine personnalisé**
   - Configure dans Vercel Settings > Domains
   - Ajoute ton domaine (ex: uywakuna.com)

## Monitoring

### Vercel Analytics (Gratuit)
- Va dans Settings > Analytics
- Active "Web Analytics"
- Vois les performances en temps réel

### Sanity Monitoring
- Dashboard: https://sanity.io/manage
- Vois l'utilisation de l'API
- Surveille les requêtes

## Mises à jour

### Déploiement automatique
Chaque `git push` déclenche un nouveau déploiement automatiquement!

### Mise à jour manuelle
```bash
git add .
git commit -m "Update content"
git push
```

## Dépannage

### Le site ne se met pas à jour?
- Attends 60 secondes (revalidation)
- Ou force un rebuild dans Vercel

### Erreur de build?
- Vérifie les variables d'environnement
- Regarde les logs dans Vercel

### Images ne chargent pas?
- Vérifie que le dataset Sanity est public
- Ou configure les CORS dans Sanity

## Support

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Sanity](https://www.sanity.io/docs)
