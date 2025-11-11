import { useState } from 'react';
import { DocumentActionComponent, useDocumentOperation } from 'sanity';
import { Button, Card, Flex, Stack, Text, Inline, Badge } from '@sanity/ui';
import { TranslateIcon, CheckmarkIcon } from '@sanity/icons';

// Types pour les champs du post
interface PostDocument {
  title_es?: string;
  title_fr?: string;
  excerpt_es?: string;
  excerpt_fr?: string;
  body_es?: any[];
  body_fr?: any[];
}

// Fonction pour traduire avec DeepL via notre API route
async function translateText(
  text: string,
  sourceLang: 'ES' | 'FR',
  targetLang: 'ES' | 'FR'
): Promise<string> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      sourceLang,
      targetLang,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Translation API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.translatedText;
}

// Fonction pour extraire le texte du blockContent
function extractTextFromBlocks(blocks?: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

// Fonction pour reconstruire les blocks avec le texte traduit
function rebuildBlocks(originalBlocks: any[], translatedText: string): any[] {
  const paragraphs = translatedText.split('\n\n').filter(Boolean);
  
  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `block-${Date.now()}-${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span-${Date.now()}-${index}`,
        text: paragraph,
        marks: [],
      },
    ],
  }));
}

export const TranslateAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props;
  const { patch } = useDocumentOperation(id, type);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationStatus, setTranslationStatus] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Ne montrer que pour les posts
  if (type !== 'post') {
    return null;
  }

  const doc = (draft || published) as PostDocument | null;

  // Si le document n'existe pas encore, ne rien afficher
  if (!doc) {
    return null;
  }

  const translateEsToFr = async () => {
    setIsTranslating(true);
    setTranslationStatus('Traduction ES → FR...');

    try {
      const updates: any = {};

      // Traduire le titre
      if (doc.title_es && !doc.title_fr) {
        setTranslationStatus('Traduction du titre...');
        updates.title_fr = await translateText(doc.title_es, 'ES', 'FR');
      }

      // Traduire l'excerpt
      if (doc.excerpt_es && !doc.excerpt_fr) {
        setTranslationStatus('Traduction de l\'extrait...');
        updates.excerpt_fr = await translateText(doc.excerpt_es, 'ES', 'FR');
      }

      // Traduire le body
      if (doc.body_es && !doc.body_fr) {
        setTranslationStatus('Traduction du contenu...');
        const bodyText = extractTextFromBlocks(doc.body_es);
        if (bodyText) {
          const translatedBody = await translateText(bodyText, 'ES', 'FR');
          updates.body_fr = rebuildBlocks(doc.body_es, translatedBody);
        }
      }

      // Appliquer les modifications
      if (Object.keys(updates).length > 0) {
        patch.execute([{ set: updates }]);
        setTranslationStatus('✅ Traduction terminée !');
        setTimeout(() => setTranslationStatus(''), 3000);
      } else {
        setTranslationStatus('Aucun champ à traduire');
        setTimeout(() => setTranslationStatus(''), 2000);
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationStatus(`❌ Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTimeout(() => setTranslationStatus(''), 5000);
    } finally {
      setIsTranslating(false);
    }
  };

  const translateFrToEs = async () => {
    setIsTranslating(true);
    setTranslationStatus('Traduction FR → ES...');

    try {
      const updates: any = {};

      // Traduire le titre
      if (doc.title_fr && !doc.title_es) {
        setTranslationStatus('Traduction du titre...');
        updates.title_es = await translateText(doc.title_fr, 'FR', 'ES');
      }

      // Traduire l'excerpt
      if (doc.excerpt_fr && !doc.excerpt_es) {
        setTranslationStatus('Traduction de l\'extrait...');
        updates.excerpt_es = await translateText(doc.excerpt_fr, 'FR', 'ES');
      }

      // Traduire le body
      if (doc.body_fr && !doc.body_es) {
        setTranslationStatus('Traduction du contenu...');
        const bodyText = extractTextFromBlocks(doc.body_fr);
        if (bodyText) {
          const translatedBody = await translateText(bodyText, 'FR', 'ES');
          updates.body_es = rebuildBlocks(doc.body_fr, translatedBody);
        }
      }

      // Appliquer les modifications
      if (Object.keys(updates).length > 0) {
        patch.execute([{ set: updates }]);
        setTranslationStatus('✅ Traduction terminée !');
        setTimeout(() => setTranslationStatus(''), 3000);
      } else {
        setTranslationStatus('Aucun champ à traduire');
        setTimeout(() => setTranslationStatus(''), 2000);
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationStatus(`❌ Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTimeout(() => setTranslationStatus(''), 5000);
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    label: 'Traduire',
    icon: TranslateIcon,
    onHandle: () => {
      // Ouvrir le dialog seulement quand on clique sur le bouton Traduire
      setDialogOpen(true);
    },
    dialog: dialogOpen && !isTranslating ? {
      type: 'popover',
      onClose: () => setDialogOpen(false),
      content: (
        <Card padding={4}>
          <Stack space={4}>
            <Text size={2} weight="semibold">
              Traduction automatique (DeepL)
            </Text>
            
            {translationStatus && (
              <Card padding={3} tone={translationStatus.includes('✅') ? 'positive' : translationStatus.includes('❌') ? 'critical' : 'primary'} radius={2}>
                <Text size={1}>{translationStatus}</Text>
              </Card>
            )}

            <Stack space={3}>
              <Text size={1} muted>
                Choisissez la direction de traduction :
              </Text>

              <Flex gap={2} direction="column">
                <Button
                  text="Espagnol → Français"
                  icon={TranslateIcon}
                  tone="primary"
                  onClick={translateEsToFr}
                  disabled={isTranslating || !doc || !doc.title_es}
                  style={{ width: '100%' }}
                />
                
                <Button
                  text="Français → Espagnol"
                  icon={TranslateIcon}
                  tone="primary"
                  onClick={translateFrToEs}
                  disabled={isTranslating || !doc || !doc.title_fr}
                  style={{ width: '100%' }}
                />
              </Flex>

              <Card padding={3} tone="caution" radius={2}>
                <Text size={1}>
                  ⚠️ Seuls les champs vides seront traduits
                </Text>
              </Card>
            </Stack>
          </Stack>
        </Card>
      ),
    } : false,
  };
};

