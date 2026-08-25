---
name: add-payload-collection
description: Add a new Payload CMS collection to this repo, following the existing conventions (Users, Media, Categories, Products). Use when adding a new collection such as Orders (per plan.md) or any other CMS-backed data type.
---

# Add a Payload collection

1. Read the existing collections in `src/collections/` (`Products.ts`, `Categories.ts`, `Users.ts`, `Media.ts`) to match this repo's field conventions, access control patterns, and admin UI config style before writing a new one.
2. Create the new collection file in `src/collections/`, e.g. `src/collections/Orders.ts`.
3. Register it in `src/payload.config.ts`'s `collections` array.
4. Check `plan.md` for the intended field shape if the collection is part of the planned catalog/checkout work (e.g. `Orders` should track the Stripe payment fields and stock decrement logic described there).
5. Run `npm run generate:types` to regenerate `src/payload-types.ts` — do this every time collection fields change, not just on creation. Note: this command is currently broken on Node 22 (`ERR_REQUIRE_ASYNC_MODULE`); if it still fails, flag it rather than assuming types are in sync.
6. If the collection introduces a new relation, double check the related collection's config doesn't need a reciprocal `hasMany`/`relationTo` update.
