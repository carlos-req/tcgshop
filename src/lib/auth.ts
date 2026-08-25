import { headers as getHeaders } from "next/headers";
import { connection } from "next/server";

import { getPayloadClient } from "@/lib/payload";
import type { Customer } from "@/payload-types";

export async function getCurrentCustomer(): Promise<Customer | null> {
  // Payload's auth/DB internals touch synchronous IO (e.g. Date.now() for
  // JWT/session expiry) that Next's cacheComponents build-time prerendering
  // can't defer on its own, even though this only ever runs inside a
  // <Suspense> boundary — connection() explicitly marks this as request-time
  // work so it's never attempted during the build.
  await connection();

  const payload = await getPayloadClient();
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  if (!user || user.collection !== "customers") {
    return null;
  }

  return user as Customer;
}
