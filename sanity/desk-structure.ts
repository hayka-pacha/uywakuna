import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      // Singleton pages
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      S.divider(),
      // Content types
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      // Remaining items (excluding singletons)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'settings', 'about'].includes(item.getId()!),
      ),
    ])
