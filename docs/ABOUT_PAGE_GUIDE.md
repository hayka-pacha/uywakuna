# Guide : Gérer la page About depuis Sanity

## 📝 Comment remplir la page About

### Étape 1 : Accéder à Sanity Studio

En mode développement :
```bash
npm run dev
```

Puis allez sur : `http://localhost:3000/studio`

### Étape 2 : Créer le contenu About

1. Dans la barre latérale de Sanity Studio, cliquez sur **"About Page"**
2. Vous verrez un formulaire avec les champs suivants :

#### Champs disponibles

**Titre (Spanish)** - `title_es`
- Le titre de la page en espagnol
- Exemple : "Acerca de Uywakuna"

**Titre (French)** - `title_fr`
- Le titre de la page en français
- Exemple : "À propos d'Uywakuna"

**Sous-titre (Spanish)** - `subtitle_es` *(optionnel)*
- Une courte description sous le titre en espagnol
- Exemple : "Somos un equipo apasionado por la naturaleza"

**Sous-titre (French)** - `subtitle_fr` *(optionnel)*
- Une courte description sous le titre en français
- Exemple : "Nous sommes une équipe passionnée par la nature"

**Contenu (Spanish)** - `content_es`
- Le contenu principal de la page en espagnol
- Éditeur de texte riche avec :
  - **Titres** : H2, H3
  - **Formatage** : Gras, Italique
  - **Liens** : Liens externes

**Contenu (French)** - `content_fr`
- Le contenu principal de la page en français
- Même éditeur de texte riche

**Show Authors Section** - `showAuthors`
- Case à cocher pour afficher/masquer la section des auteurs
- Par défaut : activé (montre les 3 premiers auteurs)

### Étape 3 : Sauvegarder et publier

1. Remplissez tous les champs requis (marqués d'un astérisque)
2. Cliquez sur **"Publish"** en haut à droite
3. Votre contenu sera visible sur `/about`

## 🎨 Structure de la page

La page About s'affiche dans cet ordre :

```
┌─────────────────────────────────┐
│         Titre (H1)              │
│         Sous-titre              │
├─────────────────────────────────┤
│                                 │
│    Section Auteurs (optionnel) │
│    [Photo] [Photo] [Photo]      │
│                                 │
├─────────────────────────────────┤
│                                 │
│      Contenu principal          │
│      (Texte riche)              │
│                                 │
└─────────────────────────────────┘
```

## 💡 Exemple de contenu

### Espagnol

**Titre** : `Acerca de Uywakuna`

**Sous-titre** : `Tu zoológico virtual dedicado a la fauna mundial`

**Contenu** :
```
Uywakuna es un proyecto educativo que nace de la pasión por la naturaleza y los animales.

## Nuestra Misión

Queremos acercar la riqueza de la biodiversidad mundial a lectores de habla hispana y francesa, ofreciendo contenido educativo y fascinante sobre la fauna de nuestro planeta.

## ¿Por qué Uywakuna?

"Uywakuna" significa "animales" en quechua, reflejando nuestro compromiso con la preservación del conocimiento ancestral sobre la naturaleza.
```

### Français

**Titre** : `À propos d'Uywakuna`

**Sous-titre** : `Votre zoo virtuel dédié à la faune mondiale`

**Contenu** :
```
Uywakuna est un projet éducatif né de la passion pour la nature et les animaux.

## Notre Mission

Nous souhaitons rapprocher la richesse de la biodiversité mondiale des lecteurs francophones et hispanophones, en proposant du contenu éducatif et fascinant sur la faune de notre planète.

## Pourquoi Uywakuna ?

"Uywakuna" signifie "animaux" en quechua, reflétant notre engagement envers la préservation des connaissances ancestrales sur la nature.
```

## 🔧 Personnalisation

### Masquer la section des auteurs

Si vous ne voulez pas afficher les photos des auteurs :
1. Décochez **"Show Authors Section"**
2. Sauvegardez
3. Seuls le titre et le contenu seront affichés

### Ajouter des liens

Dans l'éditeur de texte riche :
1. Sélectionnez le texte
2. Cliquez sur l'icône de lien (🔗)
3. Entrez l'URL
4. Le lien s'ouvrira dans un nouvel onglet

### Formatage du texte

- **Gras** : Sélectionnez le texte et cliquez sur **B**
- **Italique** : Sélectionnez le texte et cliquez sur *I*
- **Titre H2** : Utilisez pour les sections principales
- **Titre H3** : Utilisez pour les sous-sections

## 🚀 Déploiement

### En développement local
Les changements sont visibles immédiatement après publication dans Sanity.

### En production (AWS S3)
Après avoir modifié le contenu dans Sanity :

1. Rebuild le site :
   ```bash
   npm run build
   ```

2. Redéployer :
   ```bash
   ./scripts/deploy-s3.sh uywakuna-blog
   ```

3. Invalider le cache CloudFront (si configuré)

### Automatisation recommandée
Configurez des webhooks Sanity pour rebuild automatiquement le site quand vous modifiez la page About.

## ⚠️ Points importants

1. **Champs requis** : Les titres et contenus ES/FR sont obligatoires
2. **Singleton** : Il ne peut y avoir qu'une seule page About (pas de bouton "Create new")
3. **Bilingue** : Remplissez toujours les deux langues pour une expérience utilisateur complète
4. **Rebuild nécessaire** : En production statique, les changements nécessitent un rebuild

## 📚 Ressources

- [Documentation Sanity Portable Text](https://www.sanity.io/docs/block-content)
- [Guide de déploiement S3](./DEPLOYMENT_S3.md)
- [Changelog du projet](./CHANGELOG.md)

---

**Astuce** : Si vous ne voyez pas vos changements immédiatement en production, pensez à rebuilder et redéployer le site !

