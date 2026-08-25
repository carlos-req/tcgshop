import type { Pool } from "pg";
import { getPayloadClient } from "@/lib/payload";

/**
 * Atomic, conditional stock decrement (`WHERE stock >= quantity`) via a raw
 * query on the underlying pg Pool — Payload's local API can't express this
 * as a single UPDATE (its `data` only accepts literal values, not SQL
 * expressions), and a read-then-write from JS would race under concurrent
 * checkouts. Returns false if there wasn't enough stock to decrement.
 */
export async function decrementProductStock(
  productId: string,
  quantity: number,
): Promise<boolean> {
  const payload = await getPayloadClient();
  const pool = (payload.db as unknown as { pool: Pool }).pool;

  const result = await pool.query(
    "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING id",
    [quantity, productId],
  );

  return (result.rowCount ?? 0) > 0;
}
