export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fieldsets: [
    {
      name: 'spanish',
      title: 'Spanish Content (Español)',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'french',
      title: 'French Content (Français)',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    // Shared fields
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // Spanish bio
    {
      name: 'bio_es',
      title: 'Bio (Spanish)',
      type: 'array',
      fieldset: 'spanish',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
    // French bio
    {
      name: 'bio_fr',
      title: 'Bio (French)',
      type: 'array',
      fieldset: 'french',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
