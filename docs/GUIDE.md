# Guide Utilisateur - Uywakuna

## 🚀 Démarrage rapide

### Accéder à Sanity Studio

**En développement :**
```bash
npm run dev
```
Puis : `http://localhost:3000/studio`

**En production :**
`https://uywakuna.info/studio`

---

## 📝 Gérer le contenu

### Créer un article

1. **Studio** → **"Posts"** → **Create**
2. Remplir les champs bilingues (ES/FR) :
   - **Titre** : Titre de l'article
   - **Slug** : URL de l'article (ex: `condor-des-andes`)
   - **Excerpt** : Court résumé (2-3 lignes)
   - **Image principale** : Upload depuis votre ordinateur
   - **Contenu** : Texte principal avec éditeur riche
   - **Catégorie** : Sélectionner une catégorie existante
3. **Publish** ✅

### 🌐 Traduire automatiquement (DeepL)

**Nouveau !** Tu peux traduire automatiquement tes articles :

1. Écris ton article dans une langue (ES ou FR)
2. Clique sur le bouton **"Traduire"** en haut
3. Choisis la direction (ES → FR ou FR → ES)
4. La traduction se fait automatiquement !

**Note** : La clé API DeepL est déjà configurée sur Vercel. En local, ajoute `NEXT_PUBLIC_DEEPL_API_KEY` dans `.env.local` (voir [docs/DEEPL_TRANSLATION.md](./DEEPL_TRANSLATION.md))

**Gratuit** : 500 000 caractères/mois (~200 articles)

### Modifier la page About

1. **Studio** → **"About Page"**
2. Remplir les champs bilingues :
   - **Titre ES/FR** : "Sobre Uywakuna" / "À propos"
   - **Sous-titre ES/FR** : Description courte (optionnel)
   - **Contenu ES/FR** : Texte principal avec formatage
3. **Show Authors Section** : Cocher pour afficher les auteurs
4. **Publish** ✅

### Gérer les catégories

1. **Studio** → **"Categories"**
2. Créer/modifier une catégorie :
   - **Titre ES/FR** : Nom de la catégorie
   - **Slug** : URL (ex: `felino`, `serpientes`)
   - **Description ES/FR** : Courte description (optionnel)
   - **Couleur** : Choisir une couleur pour l'affichage
3. **Publish** ✅

---

## 🖼️ Gérer les images

### Uploader une image

1. Dans un article/auteur, cliquez sur le champ image
2. **Méthode A** : Cliquez sur "Upload" et sélectionnez un fichier
3. **Méthode B** : Glissez-déposez votre image directement
4. **Hotspot** : Cliquez sur le point bleu et déplacez-le sur la partie importante de l'image (visage de l'animal, sujet principal)
5. **Publish** ✅

### Formats et tailles recommandés

**Articles (Main Image) :**
- Résolution : 1920×1080 pixels (16:9)
- Poids max : 2-3 MB
- Format : JPEG

**Auteurs (Profile) :**
- Résolution : 800×800 pixels (carré)
- Poids max : 500 KB
- Format : JPEG ou PNG

**Bonnes pratiques :**
- Optimisez vos images avant upload avec [TinyPNG](https://tinypng.com/)
- Utilisez des noms descriptifs : `condor-andin-2024.jpg`
- Évitez les caractères spéciaux dans les noms de fichiers

---

## 🎨 Personnalisation

### Modifier le logo

1. **Studio** → **"Settings"**
2. Upload dans "Main logo"
3. **Publish** ✅

### Modifier les couleurs du thème

Éditer `tailwind.config.js` :
```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: "#3B82F6", // Votre couleur principale
      }
    }
  }
}
```

---

## 🚨 Dépannage

### L'image ne s'affiche pas

- Vérifiez que vous avez cliqué sur **"Publish"**
- Attendez quelques secondes (cache)
- Videz le cache du navigateur (Ctrl+Shift+R)

### Upload d'image échoue

- Fichier trop lourd → Compressez l'image (max 10 MB)
- Format non supporté → Utilisez JPEG ou PNG
- Vérifiez votre connexion internet

### Le contenu ne s'affiche pas sur le site

- Vérifiez que le document est **publié** (pas en brouillon)
- Attendez la régénération automatique (jusqu'à 1 minute)
- En développement, relancez `npm run dev`

### Erreur de build

```bash
# Nettoyer et rebuilder
rm -rf .next node_modules
npm install
npm run build
```

---

## 📱 Scripts utiles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Production
npm run build           # Build pour la production
npm start               # Lance le serveur de production

# Sanity
npm run sanity          # Lance Sanity Studio en standalone
npm run sanity-export   # Exporte les données Sanity
npm run sanity-import   # Importe des données

# Maintenance
npm run lint            # Vérifie le code
```

---

## 📚 Ressources

- [Documentation Sanity](https://www.sanity.io/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Déploiement Vercel](./DEPLOYMENT.md)
- [Site en production](https://uywakuna.info)

---

**Besoin d'aide ?** Ouvrez la console navigateur (F12) pour voir les erreurs détaillées.

