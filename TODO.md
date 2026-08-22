# TODO — remaining work from plan.md

Increments sized for one or two prompts each, in dependency order. Status reflects what's actually in the codebase as of 2026-08-22.

## 1. Orders collection
- Add the `Orders` collection (Stripe session id, line item, customer email/address, status, admin-only access).
- Use the `add-payload-collection` skill.
- **Done** — `src/collections/Orders.ts` created and registered in `payload.config.ts`. Fields: `stripeSessionId`, `stripePaymentIntentId`, `product` (relation), `quantity`, `amountTotal`, `currency`, `customerEmail`, `shippingAddress` (group), `status` (pending/paid/fulfilled/cancelled/failed). Read/update/delete restricted to logged-in users; create is server-only (`create: () => false`), since the webhook (step 5) will write orders via the Payload local API, which bypasses access control by default.
  - `npm run generate:types` still fails (pre-existing `ERR_REQUIRE_ASYNC_MODULE` issue, see CLAUDE.md) — `src/payload-types.ts` does not yet include `Order` types. Fix that command before relying on generated Order types elsewhere.

## 2. Swap static data for CMS data
- Replace `src/data/products.ts` usage in `ProductCardSection.tsx` (and anywhere else importing it) with Payload queries.
- **Done** —
  - `src/lib/payload.ts`: cached `getPayloadClient()` helper (Payload local API, per-request memoized with React `cache()`).
  - `src/data/products.ts`: `getProductsByCategory` is now async, looks up the category by slug then queries `products` by category id (`depth: 1` to populate the first image), and maps Payload docs to the existing frontend `Product` shape.
  - `ProductCardSection` no longer imports the data layer or derives category from the URL — it's a plain client component that takes `category` and `products` as props (filtering/sorting UI unchanged).
  - `page.tsx`, `magic/page.tsx`, `palworld/page.tsx` are now async Server Components that `await getProductsByCategory(...)` and pass the result down. Same category-per-route behavior as before (home still shows `palworld`, matching the prior default).
  - `ProductCard` now skips rendering the `<Image>` when a product has no uploaded image yet, instead of passing an empty `src`.
  - Verified: `tsc --noEmit` clean, dev server smoke-tested against the real Postgres container — `/`, `/magic`, `/palworld` all return 200 and correctly render the empty state (DB has no seeded Categories/Products yet, see new item below).
  - `src/app/(frontend)/products/modern-horizons-3/page.tsx` was **not** touched — it's fully hardcoded and not a consumer of `data/products.ts`; folding it into CMS-backed data is covered by step 3 (slug-based routing) since it needs to become a dynamic `[productSlug]` route anyway.

## 2a. Seed Categories/Products in the CMS
- **Done (by user)** — `Palworld` (`palworld`) and `Magic The Gathering` (`magic`) categories exist with one product each, seeded through `/admin`. The Magic category's slug was initially `magicthegathering` (didn't match the `/magic` route's query) and was corrected to `magic` mid-session.
- Verified live: with dev server + the real Postgres container running, `/magic` renders the Magic product card and `/palworld` renders the Palworld product card — both confirmed via raw HTML inspection, no "No products match" fallback.
- `pokemon` is still typed in the frontend (`ProductCategory` union) but has no category doc and no route — decide whether it's in scope before step 3, or drop it from the type.

## 2b. `payload-types.ts` has never been generated *(new — found while verifying #2, escalates the note from #1)*
- Not just missing `Order` types — **no generated types file exists at all**, because `npm run generate:types` has been broken (`ERR_REQUIRE_ASYNC_MODULE`) since before this work started. `src/data/products.ts` currently works around this with hand-written local interfaces instead of Payload's generated `Product`/`Category` types.
- This should be fixed before step 4/5 (Stripe checkout + webhook), since hand-typing every Payload doc shape gets increasingly error-prone as more collections and fields are touched.

## 2c. `npm run lint` is broken *(new — found while verifying #1)*
- `next lint` fails immediately with `Invalid project directory provided, no such directory: .../lint`, on both `npm run lint` and `npx next lint`. Likely `next lint` was removed/changed in this Next 16 install (breaking change — see AGENTS.md's warning about this repo's Next version). Using `tsc --noEmit` as a stand-in for now; worth checking `node_modules/next/dist/docs` for the Next 16 replacement (ESLint flat config run directly?) since this blocks the "no lint config" gap noted during `/init`.

## 3. Slug-based catalog routes
- Replace the current ad hoc routes (`/palworld`, `/magic`, `/products/modern-horizons-3`) with the planned `/[categorySlug]` and `/[categorySlug]/[productSlug]` dynamic routes, driven by CMS queries, plus the 404 fallback for unknown slugs.
- **Done** —
  - `src/data/categories.ts`: `getCategoryBySlug` — resolves a `Category` (id/name/slug/description) from the CMS, or `null`.
  - `src/data/products.ts`: added `getProductBySlug(categorySlug, productSlug)` returning a `ProductDetail` (adds `description`, `sku`, `stock` to `Product`), reusing `getCategoryBySlug`.
  - `src/types/product.ts`: `ProductCategory` (the old hardcoded `"magic"|"palworld"|"pokemon"` union) is gone — `Product.category` is now a plain `string` (the category slug), since categories are CMS-driven and open-ended per plan.md ("keep the taxonomy extensible"). Added `Category` and `ProductDetail` types.
  - New routes: `src/app/(frontend)/[categorySlug]/page.tsx` (category listing, calls `notFound()` if the slug doesn't resolve to a category) and `src/app/(frontend)/[categorySlug]/[productSlug]/page.tsx` (product detail, `notFound()` if either the category or the product-within-category doesn't resolve). Both have `generateMetadata`.
  - `src/app/(frontend)/not-found.tsx` added — on-brand 404 page (previously the default unstyled Next.js 404 would have shown).
  - Removed the old static folders: `magic/`, `palworld/`, `products/modern-horizons-3/`.
  - `ProductCardSection` now takes `categoryName: string` (the real CMS `Category.name`) instead of a hardcoded `categoryTitles` lookup table keyed by the old union type.
  - `ProductCard` now links its image and title to `/{category}/{slug}` (previously not a link at all).
  - Extracted `formatPrice`/`getButtonConfig` out of `ProductCard.tsx` into `src/lib/product-display.ts` so the new product detail page can reuse them instead of duplicating the status→button-label logic.
  - `HeroSection`'s CTA links were hardcoded to nonexistent slugs (`/products/palworld-base-set`, `/products/modern-horizons-3`) — repointed to the category pages (`/magic`, `/palworld`) as a safe fallback. See new item #3a below for a better long-term fix.
  - `page.tsx` (home) still hardcodes showing the `palworld` category (unchanged prior behavior), now fetches the real `Category` for its heading instead of a hardcoded label.
  - Verified live against the real seeded data: `/magic`, `/palworld` → 200 with real product cards; `/magic/magic-the-gathering-reality-fracture-play-booster-box` → 200, shows "Preorder" (status `coming_soon`); `/palworld/palworld-tcg-dawn-of-palpagos-series-01-booster-box` → 200, shows "Add to Cart" (status `in_stock`); `/nonexistent-category` and `/magic/nope-not-real` → 404 via the new not-found page. `tsc --noEmit` clean (after clearing stale `.next` type declarations left over from the deleted route folders).

## 3a. Hero banner CTA should link to a real featured product *(new — found while doing #3)*
- `Products` already has a `featured` boolean field (per plan.md's product data model) that isn't used anywhere yet. `HeroSection` currently links to the category page as a safe fallback instead of a specific product, because there was no reliable way to know which product to feature.
- Worth wiring `HeroSection` to fetch the `featured` product per category (or a global featured product) and link/display that directly, once there's more than one product per category to actually feature.

## 4. Stripe checkout session flow
- Server route that creates a Checkout Session from a CMS product: server-side stock check, CMS as price source, `shipping_address_collection` + shipping rate.
- Wire the product page's Buy action to it.
- **Not started** — `Products` only has the `stripeProductId`/`stripePriceId` fields, no checkout route exists yet.

## 5. Stripe webhook + order sync
- Webhook handler: verify signature, write the `Orders` record, atomic/conditional stock decrement (`WHERE stock > 0`), handle failed/cancelled without decrementing.
- **Not started** — depends on #1 and #4.

## 6. End-to-end validation pass
- Manual smoke test: route resolution, CMS product management, checkout redirect, stock decrement, order persistence — the checklist in plan.md's step 8.
