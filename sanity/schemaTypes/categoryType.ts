import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
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
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title_es',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description_es',
      title: 'Description (Spanish)',
      type: 'text',
    }),
    defineField({
      name: 'description_fr',
      title: 'Description (French)',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Orange', value: 'orange'},
          {title: 'Purple', value: 'purple'},
          {title: 'Pink', value: 'pink'},
        ],
      },
    }),
  ],
})
