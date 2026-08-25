import { getPayloadClient } from "@/lib/payload";
import type { Order } from "@/payload-types";

export async function getCustomerOrders(
  customerId: number,
  limit?: number,
): Promise<Order[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "orders",
    where: { customer: { equals: customerId } },
    sort: "-createdAt",
    depth: 2,
    limit,
  });

  return result.docs;
}
