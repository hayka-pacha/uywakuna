# Uywakuna - Tu Zoológico Virtual

Blog bilingue (Espagnol/Français) sur la faune et la nature, construit avec Next.js 16 et Sanity CMS v4.

> **Version 4.0.0** - Site statique optimisé pour AWS S3 | [Voir le CHANGELOG](./docs/CHANGELOG.md)

## 🌍 À propos

Uywakuna est un blog éducatif dédié à la découverte des animaux et de la nature. Le site propose du contenu en espagnol et en français, permettant aux lecteurs de découvrir la richesse de la biodiversité mondiale.

## 🚀 Technologies

- **Next.js 16.0.1** - Framework React avec App Router et export statique
- **React 19.2.0** - Dernière version avec nouvelles fonctionnalités
- **Sanity CMS v4.13.0** - Headless CMS pour la gestion du contenu
- **TypeScript 5.9.3** - Typage statique avancé
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **AWS S3 + CloudFront** - Hébergement statique et CDN

## 📋 Prérequis

- Node.js 18+ 
- npm ou pnpm
- Un compte Sanity (gratuit)

## 🛠️ Installation

1. **Clone le projet**
   ```bash
   git clone git@github.com:hayka-pacha/uywakuna.git
   cd uywakuna
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   ```

3. **Configure les variables d'environnement**
   
   Copie `.env.local.example` vers `.env.local` et remplis les valeurs:
   ```bash
   cp .env.local.example .env.local
   ```

4. **Lance le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Accède au site**
   - Site web: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

## 📁 Structure du projet

```
uywakuna/
├── app/                    # Pages Next.js (App Router)
│   ├── (website)/         # Pages publiques
│   └── (sanity)/          # Sanity Studio
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires et configurations
│   ├── sanity/           # Client et queries Sanity
│   └── i18n/             # Internationalisation
├── sanity/               # Schémas Sanity CMS
│   └── schemaTypes/      # Définitions des types de contenu
├── public/               # Fichiers statiques
└── styles/               # Styles globaux

```

## 🌐 Fonctionnalités

- ✅ Blog bilingue (ES/FR)
- ✅ Gestion de contenu avec Sanity CMS
- ✅ Pages de catégories dynamiques
- ✅ Optimisation des images automatique
- ✅ SEO optimisé
- ✅ Mode sombre/clair
- ✅ Responsive design
- ✅ Sitemap automatique

## 📝 Scripts disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Production
npm run build           # Build pour la production
npm start               # Lance le serveur de production

# Sanity
npm run sanity          # Lance Sanity Studio en standalone
npm run sanity-import   # Importe des données
npm run sanity-export   # Exporte des données

# Autres
npm run lint            # Vérifie le code
```

## 🚀 Déploiement

### Déploiement sur AWS S3 (Recommandé)

Le site est maintenant configuré pour l'export statique et peut être hébergé sur AWS S3.

**Déploiement rapide :**

```bash
# Build le site statique
npm run build

# Déploie sur S3 (nécessite AWS CLI configuré)
./scripts/deploy-s3.sh uywakuna-blog
```

**Documentation complète :** Voir [docs/DEPLOYMENT_S3.md](./docs/DEPLOYMENT_S3.md)

### Déploiement sur Vercel (Alternative)

Pour un déploiement traditionnel avec le studio intégré, consultez [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

1. Pousse ton code sur GitHub
2. Connecte ton repo à Vercel
3. Configure les variables d'environnement
4. Désactive `output: 'export'` dans `next.config.js`
5. Deploy!

## 🎨 Personnalisation

### Modifier le logo
1. Va sur `/studio`
2. Clique sur "Settings"
3. Upload ton logo dans "Main logo"

### Ajouter du contenu
1. Va sur `/studio`
2. Crée des posts, catégories, auteurs
3. Publie le contenu

### Modifier les couleurs
Édite `tailwind.config.js` pour personnaliser le thème.

## 📄 License

Ce projet est basé sur le template Stablo de Web3Templates.

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésite pas à ouvrir une issue ou une pull request.

## 📚 Documentation

- [Guide de démarrage rapide](./docs/QUICK_START_GUIDE.md)
- [Déploiement Vercel](./docs/DEPLOYMENT.md)
- [Déploiement AWS S3](./docs/DEPLOYMENT_S3.md)
- [Changelog](./docs/CHANGELOG.md)
- [Guide de mise à niveau](./docs/UPGRADE_SUMMARY.md)

---

Fait avec ❤️ pour la nature et les animaux
