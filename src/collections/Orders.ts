import type { CollectionConfig } from "payload";

import { isAdminUser } from "@/lib/access";

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
    read: ({ req: { user } }) => {
      if (isAdminUser(user)) return true;
      if (!user) return false;
      // A customer can only ever see their own orders — guest checkouts
      // (no linked customer) are admin-only, since there's no account to
      // scope them to.
      return { customer: { equals: user.id } };
    },
    create: () => false,
    update: ({ req: { user } }) => isAdminUser(user),
    delete: ({ req: { user } }) => isAdminUser(user),
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
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      index: true,
      admin: {
        description:
          "Linked when the shopper was logged in at checkout. Empty for guest checkouts.",
      },
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
