# TODO — remaining work from plan.md

Increments sized for one or two prompts each, in dependency order. Status reflects what's actually in the codebase as of 2026-08-22.

## 1. Orders collection
- Add the `Orders` collection (Stripe session id, line item, customer email/address, status, admin-only access).
- Use the `add-payload-collection` skill.
- **Not started** — only `Categories`, `Products`, `Media`, `Users` exist today.

## 2. Swap static data for CMS data
- Replace `src/data/products.ts` usage in `ProductCardSection.tsx` (and anywhere else importing it) with Payload queries.
- **Not started** — that component is still the only real consumer and it's still on the static file.

## 3. Slug-based catalog routes
- Replace the current ad hoc routes (`/palworld`, `/magic`, `/products/modern-horizons-3`) with the planned `/[categorySlug]` and `/[categorySlug]/[productSlug]` dynamic routes, driven by CMS queries, plus the 404 fallback for unknown slugs.
- **Not started** — routes are still static folders, not the planned pattern. Depends on #2 being done first (or can be done together).

## 4. Stripe checkout session flow
- Server route that creates a Checkout Session from a CMS product: server-side stock check, CMS as price source, `shipping_address_collection` + shipping rate.
- Wire the product page's Buy action to it.
- **Not started** — `Products` only has the `stripeProductId`/`stripePriceId` fields, no checkout route exists yet.

## 5. Stripe webhook + order sync
- Webhook handler: verify signature, write the `Orders` record, atomic/conditional stock decrement (`WHERE stock > 0`), handle failed/cancelled without decrementing.
- **Not started** — depends on #1 and #4.

## 6. End-to-end validation pass
- Manual smoke test: route resolution, CMS product management, checkout redirect, stock decrement, order persistence — the checklist in plan.md's step 8.
