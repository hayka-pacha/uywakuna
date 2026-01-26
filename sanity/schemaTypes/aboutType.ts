import {InfoOutlineIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle_es',
      title: 'Subtitle (Spanish)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle_fr',
      title: 'Subtitle (French)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Image displayed between title and content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'content_es',
      title: 'Content (Spanish)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content_fr',
      title: 'Content (French)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title_es',
    },
    prepare({title}) {
      return {
        title: title || 'About Page',
      }
    },
  },
})
