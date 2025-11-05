# Guide : Comment uploader des photos dans Sanity

## 🖼️ Méthodes pour ajouter des images

### Méthode 1 : Upload depuis votre ordinateur (Recommandée)

#### Étape par étape :

1. **Accédez à Sanity Studio**
   ```
   http://localhost:3000/studio
   ```
   Ou en production : `https://votre-site.com/studio`

2. **Ouvrez le document où vous voulez ajouter une image**
   - Pour un **Article** : Cliquez sur "Posts" → Sélectionnez ou créez un post
   - Pour un **Auteur** : Cliquez sur "Authors" → Sélectionnez ou créez un auteur
   - Pour la **Page About** : Cliquez sur "About Page"

3. **Trouvez le champ image**
   - Pour les articles : "Main Image"
   - Pour les auteurs : "Image"

4. **Cliquez sur le champ image**
   - Vous verrez un bouton **"Upload"** ou une zone de drop

5. **Uploadez votre photo**
   - **Méthode A** : Cliquez sur "Upload" et sélectionnez un fichier
   - **Méthode B** : Glissez-déposez (drag & drop) votre image directement

6. **Recadrez l'image (Hotspot)**
   - Une fois l'image uploadée, vous pouvez définir un "hotspot"
   - Cliquez et déplacez le point focal pour centrer ce qui est important
   - Utile pour que l'image soit bien cadrée sur mobile

7. **Sauvegardez**
   - Cliquez sur **"Publish"** (en haut à droite)

### Méthode 2 : Utiliser Unsplash (intégré)

Si vous avez installé le plugin Unsplash :

1. Dans le champ image, cliquez sur l'icône **Unsplash** (📷)
2. Recherchez une image gratuite
3. Sélectionnez l'image
4. Elle sera automatiquement importée dans votre projet Sanity
5. Publiez le document

### Méthode 3 : Sélectionner une image existante

1. Dans le champ image, cliquez sur **"Select"**
2. Choisissez parmi les images déjà uploadées dans votre bibliothèque
3. Publiez

---

## 📋 Formats d'images supportés

✅ **Formats acceptés :**
- JPEG / JPG
- PNG
- WebP
- GIF
- SVG

❌ **Non supportés :**
- BMP
- TIFF

---

## 💡 Bonnes pratiques

### Taille des images

**Pour les articles (Main Image) :**
- **Résolution recommandée** : 1920×1080 pixels (16:9)
- **Poids maximum** : 2-3 MB
- **Format** : JPEG pour les photos, PNG pour les graphiques

**Pour les auteurs (Profile Image) :**
- **Résolution recommandée** : 800×800 pixels (carré)
- **Poids maximum** : 500 KB
- **Format** : JPEG ou PNG

### Optimisation avant upload

Avant d'uploader, optimisez vos images avec :
- [TinyPNG](https://tinypng.com/) - Compression gratuite
- [Squoosh](https://squoosh.app/) - Outil Google
- [ImageOptim](https://imageoptim.com/) - App Mac
- Photoshop : "Enregistrer pour le web"

### Nommage des fichiers

✅ **Bon** :
- `condor-andin-2024.jpg`
- `ara-hyacinthe-profile.jpg`
- `amazonie-foret.jpg`

❌ **À éviter** :
- `IMG_1234.jpg`
- `photo final finale vraiment final.jpg`
- Caractères spéciaux : `émù@#$.jpg`

---

## 🎨 Utiliser le Hotspot

Le **Hotspot** permet de définir quelle partie de l'image est la plus importante :

1. Après avoir uploadé une image, cliquez dessus
2. Vous verrez un **cercle bleu** (le hotspot)
3. **Déplacez-le** sur la partie la plus importante de votre image
   - Ex : Sur le visage de l'animal
   - Ex : Sur le sujet principal
4. Cela garantit que cette partie reste visible même en recadrage automatique

**Exemple :**
```
┌─────────────────────────┐
│                         │
│     🦜 ← Hotspot ici    │
│     (sur l'oiseau)      │
│                         │
│                         │
└─────────────────────────┘
```

---

## 🔍 Gérer votre bibliothèque d'images

### Accéder à toutes vos images

1. Dans Sanity Studio, cliquez sur **"Media"** (si disponible)
2. Ou allez dans **Vision** et tapez :
   ```groq
   *[_type == "sanity.imageAsset"] | order(_createdAt desc)
   ```

### Supprimer une image inutilisée

⚠️ **Attention** : Vérifiez qu'elle n'est utilisée nulle part !

1. Accédez au document qui utilise l'image
2. Cliquez sur l'image
3. Cliquez sur **"Remove"** ou l'icône poubelle
4. Publiez les changements

### Remplacer une image

1. Cliquez sur l'image actuelle dans le document
2. Cliquez sur **"Replace"**
3. Uploadez la nouvelle image
4. Publiez

---

## 📸 Exemples pratiques

### Ajouter une photo à un article

```
1. Studio → Posts → [Votre article]
2. Section "Main Image" ⬇️
3. Click "Upload" 📤
4. Sélectionner : ara-bleu-jaune.jpg
5. Ajuster le hotspot sur l'oiseau 🎯
6. Ajouter Alt Text : "Ara bleu et jaune en vol"
7. Publish ✅
```

### Ajouter une photo de profil auteur

```
1. Studio → Authors → [Votre auteur]
2. Section "Image" ⬇️
3. Click "Upload" 📤
4. Sélectionner : photo-profil.jpg (carré de préférence)
5. Centrer le hotspot sur le visage
6. Publish ✅
```

---

## ⚙️ Configuration avancée

### Activer Unsplash (si pas déjà fait)

Le plugin est déjà installé dans votre projet :

```javascript
// sanity.config.ts (déjà configuré)
plugins: [
  unsplashImageAsset(),
  // ...
]
```

### Personnaliser les champs d'image

Si vous voulez ajouter des métadonnées aux images :

```typescript
// Dans votre schéma
defineField({
  name: 'mainImage',
  type: 'image',
  options: {
    hotspot: true, // Active le hotspot
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important pour SEO et accessibilité',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Légende de l\'image',
    },
  ],
})
```

---

## 🚨 Dépannage

### "Upload failed"

**Causes possibles :**
1. **Fichier trop lourd** → Compressez l'image (max 10 MB par défaut)
2. **Format non supporté** → Utilisez JPEG ou PNG
3. **Connexion lente** → Réessayez
4. **Quota dépassé** → Vérifiez votre plan Sanity

### L'image n'apparaît pas sur le site

**Solutions :**
1. **Vérifiez que vous avez publié** (bouton "Publish")
2. **Attendez quelques secondes** (cache)
3. **Rebuild le site** :
   ```bash
   npm run build
   ```
4. **Vérifiez la console navigateur** pour les erreurs

### L'image est floue ou mal cadrée

**Solutions :**
1. **Uploadez une image de meilleure résolution**
2. **Ajustez le hotspot** pour recadrer correctement
3. **Vérifiez les dimensions recommandées** (voir ci-dessus)

---

## 📱 Images responsives

Vos images sont automatiquement optimisées pour :
- **Desktop** : Haute résolution
- **Tablet** : Résolution moyenne
- **Mobile** : Résolution adaptée + recadrage intelligent via hotspot

Sanity génère automatiquement différentes tailles :
```
- Image originale : 1920×1080
- Large : 1200×675
- Medium : 800×450
- Small : 400×225
- Thumbnail : 200×113
```

---

## ✅ Checklist avant upload

Avant d'uploader une image, vérifiez :

- [ ] L'image est **optimisée** (< 2 MB pour articles)
- [ ] Le **format est supporté** (JPEG/PNG/WebP)
- [ ] Le **nom de fichier est descriptif** (pas de caractères spéciaux)
- [ ] La **résolution est adaptée** (min 1200px de largeur pour articles)
- [ ] Vous avez les **droits d'utilisation** de l'image
- [ ] L'image est **nette et de bonne qualité**

---

## 🎓 Ressources utiles

- [Documentation Sanity Images](https://www.sanity.io/docs/image-type)
- [Hotspot & Crop](https://www.sanity.io/docs/presenting-images)
- [Image URLs API](https://www.sanity.io/docs/image-url)
- [Unsplash Plugin](https://www.sanity.io/plugins/sanity-plugin-asset-source-unsplash)

---

**Besoin d'aide ?** Consultez les logs de Sanity Studio dans la console navigateur (F12).

