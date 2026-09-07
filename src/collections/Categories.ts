import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "metaTitle",
      type: "text",
      admin: {
        position: "sidebar",
        description:
          "Overrides the auto-generated <title>. Leave blank to use the default.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      maxLength: 160,
      admin: {
        position: "sidebar",
        description:
          "Overrides the auto-generated meta description (~155 characters).",
      },
    },
  ],
};
