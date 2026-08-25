export const isAdminUser = (
  user: { collection: string } | null | undefined,
) => Boolean(user) && user!.collection === "users";
