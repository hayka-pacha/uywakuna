# Traduction Automatique avec DeepL

Ce projet intègre la traduction automatique via l'API DeepL directement dans Sanity Studio.

## 🚀 Configuration

### 1. Obtenir une clé API DeepL

1. Va sur [DeepL API](https://www.deepl.com/pro-api)
2. Crée un compte **DeepL API Free** (500 000 caractères/mois gratuits)
3. Récupère ta clé API dans le dashboard

### 2. Ajouter la clé dans les variables d'environnement

Ajoute la clé dans ton fichier `.env.local` :

```bash
NEXT_PUBLIC_DEEPL_API_KEY=votre-clé-deepl-ici
```

**Important** : Utilise `NEXT_PUBLIC_` comme préfixe pour que la variable soit disponible côté client dans le Studio.

### 3. Redémarrer le serveur

```bash
npm run dev
```

## 📝 Utilisation

### Dans Sanity Studio (/studio)

1. **Ouvre un article** (Post) en mode édition
2. **Clique sur le bouton "Traduire"** dans la barre d'actions (en haut)
3. **Choisis la direction** :
   - `Espagnol → Français` : Traduit les champs ES vers FR
   - `Français → Espagnol` : Traduit les champs FR vers ES

### Champs traduits automatiquement

✅ **Titre** (`title_es` / `title_fr`)  
✅ **Extrait** (`excerpt_es` / `excerpt_fr`)  
✅ **Contenu** (`body_es` / `body_fr`)

### Règles de traduction

⚠️ **Le bouton ne traduit que les champs vides** pour éviter d'écraser du contenu existant.

**Exemple** :
- Si `title_es` est rempli et `title_fr` est vide → traduit
- Si `title_es` et `title_fr` sont tous deux remplis → ne fait rien

## 🎯 Workflow recommandé

### Option A : Écrire en espagnol d'abord

1. Écris ton article en espagnol (title_es, excerpt_es, body_es)
2. Clique sur "Traduire" → "Espagnol → Français"
3. Révise et ajuste la traduction française si nécessaire
4. Publie

### Option B : Écrire en français d'abord

1. Écris ton article en français (title_fr, excerpt_fr, body_fr)
2. Clique sur "Traduire" → "Français → Espagnol"
3. Révise et ajuste la traduction espagnole si nécessaire
4. Publie

## ⚡ Limites

### API DeepL Free
- **500 000 caractères/mois** gratuits
- Suffisant pour ~200 articles de 2500 caractères
- Après : API Pro à partir de 4,99€/mois

### Traduction du contenu rich text
- Le contenu formaté (gras, italique, liens) est converti en texte brut
- La structure (titres H2/H3) n'est pas préservée
- **Recommandation** : Révise toujours la traduction automatique

## 🔧 Dépannage

### "DeepL API key not configured"

**Solution** :
1. Vérifie que `NEXT_PUBLIC_DEEPL_API_KEY` est dans `.env.local`
2. Redémarre le serveur (`npm run dev`)
3. Vide le cache du navigateur (Ctrl+Shift+R)
4. Sur Vercel, vérifie que la variable est bien configurée dans Settings > Environment Variables

### "DeepL API error: 403"

**Causes possibles** :
- Clé API invalide
- Quota mensuel dépassé
- Utilise `https://api-free.deepl.com` si tu as un compte gratuit

**Solution** :
- Vérifie ta clé API sur [ton dashboard DeepL](https://www.deepl.com/account/summary)
- Vérifie ton usage : [www.deepl.com/account/usage](https://www.deepl.com/account/usage)

### Le bouton ne fait rien

**Solution** :
1. Ouvre la console du navigateur (F12)
2. Regarde les erreurs
3. Vérifie que tu as bien rempli au moins un champ source (ES ou FR)

### La traduction est incomplète

Le bouton ne traduit **que les champs vides**. Si un champ est déjà rempli, il ne sera pas écrasé.

**Solution** : Vide manuellement le champ cible avant de lancer la traduction.

## 📊 Suivi de l'usage

Consulte ton usage DeepL :
- [Dashboard DeepL](https://www.deepl.com/account/summary)
- [Détails d'usage](https://www.deepl.com/account/usage)

## 🔗 Ressources

- [Documentation DeepL API](https://developers.deepl.com/docs)
- [Langues supportées](https://developers.deepl.com/docs/resources/supported-languages)
- [Tarifs DeepL API](https://www.deepl.com/pro-api)

---

**Note** : DeepL offre une excellente qualité de traduction, mais il est toujours recommandé de relire et d'ajuster les traductions automatiques, surtout pour du contenu technique ou spécialisé.

