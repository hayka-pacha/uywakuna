export default {
  name: "post",
  title: "Post",
  type: "document",
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fieldsets: [
    {
      name: "spanish",
      title: "Spanish Content (Español)",
      options: { collapsible: true, collapsed: false }
    },
    {
      name: "french",
      title: "French Content (Français)",
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    // Spanish fields
    {
      name: "title_es",
      title: "Title (Spanish)",
      type: "string",
      fieldset: "spanish",
      validation: Rule => Rule.required()
    },
    {
      name: "slug_es",
      title: "Slug (Spanish)",
      type: "slug",
      fieldset: "spanish",
      options: {
        source: "title_es",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "excerpt_es",
      title: "Excerpt (Spanish)",
      description: "Used in blog feeds and search results",
      type: "text",
      rows: 3,
      fieldset: "spanish",
      validation: Rule => Rule.max(200).required()
    },
    {
      name: "body_es",
      title: "Body (Spanish)",
      type: "blockContent",
      fieldset: "spanish",
      validation: Rule => Rule.required()
    },
    // French fields
    {
      name: "title_fr",
      title: "Title (French)",
      type: "string",
      fieldset: "french",
      validation: Rule => Rule.required()
    },
    {
      name: "slug_fr",
      title: "Slug (French)",
      type: "slug",
      fieldset: "french",
      options: {
        source: "title_fr",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "excerpt_fr",
      title: "Excerpt (French)",
      description: "Used in blog feeds and search results",
      type: "text",
      rows: 3,
      fieldset: "french",
      validation: Rule => Rule.max(200).required()
    },
    {
      name: "body_fr",
      title: "Body (French)",
      type: "blockContent",
      fieldset: "french",
      validation: Rule => Rule.required()
    },
    // Shared fields
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" }
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        // {
        //   name: "caption",
        //   type: "string",
        //   title: "Image caption",
        //   description: "Appears below image.",

        // },
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity."
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "featured",
      title: "Mark as Featured",
      type: "boolean"
    },
  ],

  preview: {
    select: {
      title_es: "title_es",
      title_fr: "title_fr",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { title_es, title_fr, author } = selection;
      return Object.assign({}, selection, {
        title: `${title_es} / ${title_fr}`,
        subtitle: author && `by ${author}`
      });
    }
  }
};
