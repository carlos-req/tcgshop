import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "status", "stock"],
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
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      index: true,
    },
    {
      name: "sku",
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
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "originalPrice",
      type: "number",
      min: 0,
    },
    {
      name: "stock",
      type: "number",
      required: true,
      min: 0,
      defaultValue: 0,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "coming_soon",
      options: [
        {
          label: "In Stock",
          value: "in_stock",
        },
        {
          label: "Coming Soon",
          value: "coming_soon",
        },
        {
          label: "Out of Stock",
          value: "out_of_stock",
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "images",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "stripeProductId",
      type: "text",
      index: true,
    },
    {
      name: "stripePriceId",
      type: "text",
      index: true,
    },
  ],
};
