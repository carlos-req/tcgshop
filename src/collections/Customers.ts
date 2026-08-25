import type { CollectionConfig } from "payload";

const isAdminUser = (user: { collection: string } | null | undefined) =>
  Boolean(user) && user!.collection === "users";

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "phone"],
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => {
      if (isAdminUser(user)) return true;
      if (!user) return false;
      return { id: { equals: user.id } };
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (isAdminUser(user)) return true;
      if (!user) return false;
      return { id: { equals: user.id } };
    },
    delete: ({ req: { user } }) => isAdminUser(user),
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      admin: {
        description: "Mobile contact number.",
      },
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
  ],
};
