export default {
  name: "category",
  title: "Category",
  type: "document",
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
      name: "description_es",
      title: "Description (Spanish)",
      type: "text",
      fieldset: "spanish"
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
      name: "description_fr",
      title: "Description (French)",
      type: "text",
      fieldset: "french"
    },
    // Shared fields
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Shared slug for both languages",
      options: {
        source: "title_es",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "color",
      title: "Color",
      type: "string",
      description: "Color of the category badge",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Blue", value: "blue" },
          { title: "Purple", value: "purple" },
          { title: "Orange", value: "orange" },
          { title: "Red", value: "red" },
          { title: "Yellow", value: "yellow" }
        ]
      }
    }
  ],
  preview: {
    select: {
      title_es: "title_es",
      title_fr: "title_fr",
      color: "color"
    },
    prepare(selection) {
      const { title_es, title_fr, color } = selection;
      return {
        title: `${title_es} / ${title_fr}`,
        subtitle: color ? `Color: ${color}` : 'No color set'
      };
    }
  }
};
