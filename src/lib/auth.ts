import { headers as getHeaders } from "next/headers";

import { getPayloadClient } from "@/lib/payload";
import type { Customer } from "@/payload-types";

export async function getCurrentCustomer(): Promise<Customer | null> {
  const payload = await getPayloadClient();
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  if (!user || user.collection !== "customers") {
    return null;
  }

  return user as Customer;
}
