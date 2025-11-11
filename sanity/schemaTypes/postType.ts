import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {TranslateAction} from '../plugins/translateAction'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  __experimental_actions: [
    'create',
    'update',
    TranslateAction,
    'delete',
    'publish'
  ],
  fields: [
    defineField({
      name: 'title_es',
      title: 'Title (Spanish)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title_fr',
      title: 'Title (French)',
      type: 'string',
    }),
    defineField({
      name: 'slug_es',
      title: 'Slug (Spanish)',
      type: 'slug',
      options: {
        source: 'title_es',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug_fr',
      title: 'Slug (French)',
      type: 'slug',
      options: {
        source: 'title_fr',
      },
    }),
    defineField({
      name: 'excerpt_es',
      title: 'Excerpt (Spanish)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'excerpt_fr',
      title: 'Excerpt (French)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body_es',
      title: 'Body (Spanish)',
      type: 'blockContent',
    }),
    defineField({
      name: 'body_fr',
      title: 'Body (French)',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title_es: 'title_es',
      title_fr: 'title_fr',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title_es, title_fr, author} = selection
      return {
        title: title_es || title_fr || 'Untitled',
        subtitle: author && `by ${author}`,
        media: selection.media
      }
    },
  },
})
