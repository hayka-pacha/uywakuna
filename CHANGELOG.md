# Changelog

Toutes les modifications notables apportées au projet Uywakuna Blog seront documentées dans ce fichier.

## [4.0.0] - 2025-11-05

### 🚀 Mises à jour majeures

#### Frameworks et bibliothèques principales
- ⬆️ **Next.js** : 14.1.0 → **16.0.1**
  - Support de Turbopack amélioré
  - Nouveau système de params (async)
  - Export statique optimisé

- ⬆️ **React & React-DOM** : 18.2.0 → **19.2.0**
  - Nouvelles fonctionnalités React 19
  - Amélioration des performances

- ⬆️ **TypeScript** : 5.3.3 → **5.9.3**
  - Support des dernières fonctionnalités ES2024
  - Améliorations de l'inférence de types

#### Sanity CMS
- ⬆️ **Sanity** : 3.99.0 → **4.13.0** (Migration majeure)
  - `deskTool` → `structureTool`
  - Nouvelles APIs de structure
  - Performances améliorées

- ⬆️ **next-sanity** : 9.12.3 → **11.6.5**
  - Compatibilité Next.js 16
  - Suppression de `defineLive` (API expérimentale)

- ⬆️ **@sanity/vision** : 3.99.0 → **4.13.0**
- ⬆️ **@sanity/code-input** : 4.1.2 → **6.0.3**
- ⬆️ **@sanity/icons** : 2.11.8 → **3.7.4**
- ⬆️ **@sanity/ui** : 2.0.1 → **3.1.11**
- ⬆️ **@sanity/table** : 1.1.2 → **2.0.0**
- ⬆️ **@sanity/types** : 3.26.0 → **4.13.0**

#### Autres dépendances
- ⬆️ **react-refractor** : 2.1.7 → **4.0.0**
  - Nouvelle API d'import
  - Support de refractor v4

- ⬆️ **@headlessui/react** : 1.7.18 → **2.2.9**
- ⬆️ **@heroicons/react** : 2.1.1 → **2.2.0**
- ⬆️ **date-fns** : 3.3.1 → **4.1.0**
- ⬆️ **next-themes** : 0.2.1 → **0.4.5**
- ⬆️ **styled-components** : 6.1.19 (mise à jour mineure)

### ✨ Nouvelles fonctionnalités

#### Export statique
- ✅ Configuration de l'export statique complet
- ✅ Support du déploiement sur AWS S3
- ✅ Optimisation du cache pour les assets
- ✅ Génération de pages statiques pour tous les articles

#### Documentation
- 📝 Guide complet de déploiement sur AWS S3
  - Configuration S3
  - Setup CloudFront CDN
  - Configuration du domaine personnalisé
  - Automatisation avec GitHub Actions

- 📝 Script de déploiement automatisé (`scripts/deploy-s3.sh`)
- 📝 CHANGELOG.md pour suivre les versions

### 🔧 Corrections et améliorations

#### Configuration Next.js
- ✅ Mise à jour de `next.config.js` pour Next.js 16
  - Suppression des options obsolètes (`swcMinify`, `eslint`)
  - Ajout de `output: 'export'` pour l'export statique
  - Configuration `images.unoptimized = true`
  - Ajout de `trailingSlash: true` pour S3

#### Adaptations du code
- ✅ Migration des params vers le nouveau système async
  - `await params` dans toutes les pages dynamiques
  - Correction de `generateMetadata`

- ✅ Correction des imports Sanity v4
  - `sanity/desk` → `sanity/structure`
  - `deskTool` → `structureTool`
  - Renommage de `sanity/structure.ts` → `sanity/desk-structure.ts`

- ✅ Mise à jour de react-refractor
  - Nouveaux imports de langages
  - API `refractor.register()` mise à jour

#### CSS et Styling
- ✅ Correction de l'ordre des imports CSS
  - `@import` déplacé avant les directives `@tailwind`

#### Pages spécifiques
- ✅ Page `/archive`
  - Suppression de `runtime = "edge"`
  - Suppression de `dynamic = "force-dynamic"`
  - Pagination simplifiée pour l'export statique

- ✅ Page `/studio`
  - Configuration pour exclusion de l'export statique
  - `generateStaticParams` avec params minimaux
  - Documentation pour hébergement séparé

### 📦 Fichiers créés

```
docs/
  └── DEPLOYMENT_S3.md          # Guide de déploiement S3
scripts/
  └── deploy-s3.sh               # Script de déploiement automatisé
CHANGELOG.md                     # Ce fichier
```

### 📦 Fichiers modifiés

```
package.json                     # Toutes les dépendances mises à jour
next.config.js                   # Configuration pour export statique
sanity.config.ts                 # Migration vers structureTool
sanity/desk-structure.ts         # Renommé depuis structure.ts
lib/sanity/plugins/settings.tsx  # Import corrigé pour Sanity v4
lib/sanity/plugins/portabletext.js # Migration react-refractor v4
sanity/lib/live.ts              # Stubs pour compatibilité
app/(website)/post/[slug]/page.js # Params async
app/(website)/archive/page.js    # Simplification pour export
app/(sanity)/studio/[[...index]]/page.tsx # Export statique
styles/tailwind.css             # Ordre des imports CSS
```

### ⚠️ Breaking Changes

#### Pour les développeurs

1. **Next.js 16 - Params async**
   - Tous les `params` doivent maintenant être await
   - Ancienne méthode : `function Page({ params }) { const slug = params.slug }`
   - Nouvelle méthode : `async function Page({ params }) { const { slug } = await params }`

2. **Sanity v4**
   - Import changé : `sanity/desk` → `sanity/structure`
   - Plugin changé : `deskTool()` → `structureTool()`

3. **Export statique**
   - Le studio Sanity n'est plus inclus dans l'export statique
   - Recommandation : Héberger le studio séparément sur Vercel
   - La pagination est limitée à la première page

4. **react-refractor v4**
   - Import changé : `import Refractor from "react-refractor"` → `import { Refractor } from "react-refractor"`
   - Langages : `import js from "refractor/lang/javascript"` (sans .js)

#### Pour les utilisateurs

- 📝 Le contenu Sanity est maintenant figé au moment du build
- 📝 Nécessite un rebuild pour afficher les nouveaux articles
- 📝 Recommandation : Configurer des webhooks Sanity pour rebuild automatique

### 🐛 Bugs connus et limitations

1. **Turbopack** : Erreurs TypeScript dans le code généré (contournées avec `ignoreBuildErrors`)
2. **Pagination** : Limitée à la première page dans l'export statique
3. **Studio** : Doit être hébergé séparément pour rester fonctionnel

### 🔮 Prochaines étapes recommandées

- [ ] Configurer des webhooks Sanity pour rebuild automatique
- [ ] Héberger le studio Sanity séparément sur Vercel
- [ ] Implémenter la pagination complète avec `generateStaticParams`
- [ ] Ajouter Algolia ou une autre solution de recherche
- [ ] Configurer Lambda@Edge pour les redirections
- [ ] Ajouter des tests E2E avec Playwright

### 📚 Documentation mise à jour

- README.md mis à jour avec les nouvelles versions
- Guide de déploiement AWS S3 complet
- Script de déploiement automatisé
- Checklist de mise en production

### 💡 Notes de migration

Si vous migrez depuis la version 3.0.0 :

1. Sauvegardez vos variables d'environnement
2. Supprimez `node_modules` et `package-lock.json`
3. Installez les nouvelles dépendances : `npm install --legacy-peer-deps`
4. Testez le build local : `npm run build`
5. Vérifiez le site généré : `npx serve out`
6. Déployez sur S3 : `./scripts/deploy-s3.sh`

### 🙏 Remerciements

Merci à l'équipe Next.js, Sanity et à tous les contributeurs des bibliothèques open-source utilisées dans ce projet.

---

## [3.0.0] - 2025-XX-XX

Version initiale avec Next.js 14, React 18, et Sanity v3.

---

**Légende** :
- 🚀 Nouvelles fonctionnalités
- ⬆️ Mises à jour
- 🔧 Corrections
- ⚠️ Breaking changes
- 🐛 Bugs
- 📝 Documentation
- ✅ Améliorations

