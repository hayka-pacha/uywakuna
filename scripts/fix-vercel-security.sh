#!/bin/bash

# Script pour désactiver Attack Challenge Mode via API Vercel
# Projet : uywakuna (prj_At4SNqRrwLZBnGRACsgfFQi2M2bI)
# Team : hkpas-projects (team_mxblmhi6TVa2WnqtG1ytpaiT)

set -e

PROJECT_ID="prj_At4SNqRrwLZBnGRACsgfFQi2M2bI"
TEAM_ID="team_mxblmhi6TVa2WnqtG1ytpaiT"

echo "🔧 Désactivation de Attack Challenge Mode pour uywakuna..."
echo ""
echo "⚠️  Pour utiliser ce script, vous devez :"
echo "   1. Créer un token API sur https://vercel.com/account/tokens"
echo "   2. Exporter le token : export VERCEL_TOKEN='votre_token'"
echo ""

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ Variable VERCEL_TOKEN non définie"
  echo "   Créez un token sur : https://vercel.com/account/tokens"
  echo "   Puis exécutez : export VERCEL_TOKEN='votre_token'"
  exit 1
fi

echo "✅ Token trouvé"
echo ""

# Récupérer la config actuelle
echo "📊 Configuration actuelle :"
curl -s "https://api.vercel.com/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" | jq -r '.protection // "Aucune protection configurée"'

echo ""
echo "🔄 Désactivation de la protection..."

# Désactiver Attack Challenge Mode
RESPONSE=$(curl -s -X PATCH \
  "https://api.vercel.com/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "protectionBypass": {
      "value": "allow"
    }
  }')

if echo "$RESPONSE" | jq -e '.error' > /dev/null; then
  echo "❌ Erreur :"
  echo "$RESPONSE" | jq -r '.error.message'
  exit 1
fi

echo "✅ Protection désactivée avec succès !"
echo ""

# Attendre la propagation
echo "⏳ Attente de la propagation (30 secondes)..."
sleep 30

# Tester l'accès
echo "🧪 Test de l'accès Googlebot..."
HTTP_CODE=$(curl -s -A "Googlebot/2.1 (+http://www.google.com/bot.html)" -o /dev/null -w "%{http_code}" https://uywakuna.info/)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ SUCCESS ! Googlebot peut maintenant accéder au site (HTTP $HTTP_CODE)"
  echo ""
  echo "📋 Prochaines étapes :"
  echo "   1. Attendez 24-48h que Google recrawle le sitemap"
  echo "   2. Vérifiez Google Search Console"
else
  echo "⚠️  Accès toujours bloqué (HTTP $HTTP_CODE)"
  echo "   Il peut y avoir d'autres protections actives."
  echo "   Allez sur : https://vercel.com/hkpas-projects/uywakuna/settings/security"
fi
