import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "stripeSessionId",
    defaultColumns: [
      "stripeSessionId",
      "product",
      "customerEmail",
      "status",
      "amountTotal",
      "createdAt",
    ],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "stripeSessionId",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "stripePaymentIntentId",
      type: "text",
      index: true,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      index: true,
    },
    {
      name: "quantity",
      type: "number",
      required: true,
      min: 1,
      defaultValue: 1,
    },
    {
      name: "amountTotal",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Total charged, in the smallest currency unit (e.g. cents).",
      },
    },
    {
      name: "currency",
      type: "text",
      required: true,
      defaultValue: "usd",
    },
    {
      name: "customerEmail",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "shippingAddress",
      type: "group",
      fields: [
        { name: "line1", type: "text" },
        { name: "line2", type: "text" },
        { name: "city", type: "text" },
        { name: "state", type: "text" },
        { name: "postalCode", type: "text" },
        { name: "country", type: "text" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      index: true,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Fulfilled", value: "fulfilled" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Failed", value: "failed" },
      ],
    },
  ],
};
