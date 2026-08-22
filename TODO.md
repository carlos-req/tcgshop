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

## 2b. `payload-types.ts` has never been generated — FIXED
- Root cause: `payload.config.ts` uses ESM syntax but `package.json` had no `"type": "module"`, so `tsx` loaded it via CJS `require()`. That pulled in Lexical's `.node.mjs` files (which use top-level `await` for their dev/prod conditional import) through a synchronous `require()` graph — illegal under Node 22's `require(esm)` support, hence `ERR_REQUIRE_ASYNC_MODULE`. Confirmed via `NODE_OPTIONS="--experimental-print-required-tla"`, which named the exact Lexical files.
- Fix: added `"type": "module"` to `package.json`. `npm run generate:types` now works and `src/payload-types.ts` is generated (476 lines, includes `User`/`Media`/`Category`/`Product`/`Order`).
- Verified this didn't break anything else: `tsc --noEmit` clean, `npm run dev` serves `/`, `/magic`, `/admin` all 200, and a full `npm run build` completes successfully with the expected route list (including `/api/checkout` and `/api/stripe/webhook` correctly taking precedence over Payload's `/api/[...slug]` catch-all — confirmed no routing collision).
- Not yet done, still worth picking up separately: `src/data/products.ts`, `src/data/categories.ts`, and the webhook route still use hand-written local interfaces (`PayloadProductDoc`, etc.) instead of importing the now-available generated `Product`/`Category`/`Order` types from `src/payload-types.ts`. Low urgency now that the file itself exists and can be regenerated on demand, but switching over would remove the hand-maintained duplication.

## 2c. `npm run lint` is broken — FIXED
- Root cause (not a bug, an intentional breaking change): **Next.js 16 removed the `next lint` command entirely**, per its own docs (`node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md`) — confirmed via `next --help`, which lists no `lint` subcommand at all. Projects are expected to run ESLint directly via a flat config.
- Fix: added `eslint.config.mjs` (spreads `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` + `eslint-config-prettier`, per Next's own migration doc), installed `eslint-config-prettier`, changed the `lint` script to `eslint .`.
- Hit a second, unrelated bug while verifying: ESLint 10.8.1 (pinned in `package.json` before this session) crashed inside `eslint-config-next`'s bundled `eslint-plugin-react` (`contextOrFilename.getFilename is not a function`) — an ESLint-10-vs-eslint-plugin-react incompatibility, both sides of which are very recent releases. Fixed by pinning `eslint` to `^9.39.5` (latest 9.x), which the plugin is actually compatible with.
- Verified: `npm run lint` runs clean with no errors; confirmed it actually catches real issues by deliberately introducing an unused variable (caught as expected, then reverted); `tsc --noEmit` and a full `npm run build` both still pass after the eslint downgrade.

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

## 3a. Hero banner CTA should link to a real featured product — FIXED
- `src/data/products.ts`: added `getFeaturedProduct(categorySlug)` — queries `products` where `category` matches and `featured: true`, returns the first match (or `null`).
- `HeroSection` is no longer a client component sniffing `usePathname()` — it's a plain server-rendered component taking `categorySlug`, `categoryName`, and `featuredProduct` as props from its parent page. The two existing wide banner images (Magic/Palworld S3 art) are kept as category-level hero art — a featured product's own image is a square product photo, not shaped for a 1920×600 banner, so swapping in product photos there would look wrong. What actually changes: the CTA `href` and `aria-label` are now driven by the real featured product (`/{category}/{product-slug}`, "Preorder {product name}") instead of the two nonexistent hardcoded slugs from before — falls back to linking the category page if a category has no `featured` product.
- `page.tsx` (home) and `[categorySlug]/page.tsx` both fetch `getFeaturedProduct` alongside their existing category/products fetches and pass it down.
- Verified live: home page hero now links to `/palworld/palworld-tcg-dawn-of-palpagos-series-01-booster-box` with `aria-label="Preorder Palworld TCG: ..."`; `/magic` hero links to the real Magic product similarly; confirmed the linked URL is a real 200 page, not a 404. `tsc --noEmit` clean.

## 4. Stripe checkout session flow
- Server route that creates a Checkout Session from a CMS product: server-side stock check, CMS as price source, `shipping_address_collection` + shipping rate.
- Wire the product page's Buy action to it.
- **Code done, blocked on credentials/data before it can actually run a real checkout** —
  - `src/lib/stripe.ts`: lazy `getStripeClient()` reading `STRIPE_SECRET_KEY`.
  - `src/data/products.ts`: added `getProductForCheckout(categorySlug, productSlug)` — a server-only accessor returning `stripePriceId`/`stock`/`status`, kept separate from the public `Product`/`ProductDetail` shape so Stripe internals never leak into that type. Refactored the shared category+slug lookup into `findProductDoc`.
  - `src/app/(frontend)/api/checkout/route.ts`: `POST` creates a Checkout Session — validates the body, 404s on unknown product, 409s when `out_of_stock` or (`in_stock` with `stock < 1`), 422s when the product has no `stripePriceId` yet. `coming_soon` (preorder) products are allowed through even with 0 stock, matching the existing "Preorder" button behavior in the UI — only `in_stock` items are stock-gated. Uses `shipping_address_collection: { allowed_countries: ["US"] }` and a flat `shipping_rate_data` of $5.99, `success_url`/`cancel_url` back to the product page with a `?checkout=success|cancelled` query param, and `metadata` (productId/categorySlug/productSlug) for the webhook in step 5 to key off.
  - `src/components/BuyButton.tsx`: client component — POSTs to `/api/checkout`, redirects to `session.url` on success, shows an inline error otherwise. Replaces the old static, non-functional button on the product detail page.
  - Product page now reads a `checkout` search param and shows a success/cancelled banner, per plan.md's "successful payment returns to success/cancel states in the storefront."
  - Verified: `tsc --noEmit` clean; live-tested all three guard paths (404 unknown product, 422 missing `stripePriceId`, 400 malformed body) against the real seeded data — all correct.
  - **Fully verified end-to-end** — user added `STRIPE_SECRET_KEY` and set both products' `stripePriceId`/`stripeProductId` in `/admin`. Hit the real `/api/checkout` route for both seeded products and got back real `cs_test_...` Stripe Checkout URLs. Pulled the session back from the Stripe API directly to confirm: `amount_total` = 14598 (product $139.99 + $5.99 shipping = $145.98 ✓), `shipping_address_collection.allowed_countries` = `["US"]` ✓, `shipping_cost.amount_total` = 599 ✓, `metadata` carries `productId`/`categorySlug`/`productSlug` for step 5's webhook to key off ✓, `status: "open"` ✓.
  - Not yet done: actually completing a test-mode payment through Stripe's hosted page (e.g. test card `4242 4242 4242 4242`) to see the success-banner redirect fire — worth a manual click-through, but the session itself is confirmed correctly configured.

## 5. Stripe webhook + order sync
- Webhook handler: verify signature, write the `Orders` record, atomic/conditional stock decrement (`WHERE stock > 0`), handle failed/cancelled without decrementing.
- **Done, fully verified live** —
  - `src/lib/inventory.ts`: `decrementProductStock(productId, quantity)` — a raw `UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1` via `payload.db.pool` (the underlying `pg.Pool`, exposed by `@payloadcms/db-postgres`). This is the actual atomic fix for the oversell risk flagged back in the plan.md review — Payload's local API `update` can't express a conditional decrement as a single query (its `data` only takes literal values), so a JS read-then-write would have re-introduced the race.
  - `src/app/(frontend)/api/stripe/webhook/route.ts`: verifies `stripe-signature` via `STRIPE_WEBHOOK_SECRET`, handles `checkout.session.completed` — only acts if `payment_status === "paid"`; creates the `Order` (session id, payment intent, product, quantity, amount, currency, customer email, shipping address pulled from `session.collected_information.shipping_details`), then decrements stock only if the order write succeeded. A duplicate webhook delivery hits the `stripeSessionId` unique constraint and is treated as a no-op (logged, not re-processed) rather than retried.
  - Fixed one real bug during testing: the `product` relationship field needs a numeric id for `payload.create` (unlike `find`'s `where`, which accepts a string) — `session.metadata.productId` (always a string, since Stripe metadata values are strings) needed `Number(...)` before use.
  - **Live-verified all four cases** using a synthetic, validly-signed webhook event (via `stripe.webhooks.generateTestHeaderString`, since the Stripe CLI needs an interactive browser login this environment doesn't have — installed the CLI anyway via its GitHub release binary in case the user wants `stripe listen` later, at `/opt/homebrew/bin/stripe`):
    1. Normal case: stock 5→4, `Order` row created with correct fields.
    2. Duplicate delivery (same session id resent): no second order, stock unchanged at 4 — confirmed via log that it hit the `stripeSessionId` uniqueness check, not a different silent failure.
    3. Oversell guard (stock forced to 0, then a "paid" event arrives anyway): `Order` is still recorded (the charge already happened — can't be undone from the webhook), stock correctly stays at 0 instead of going negative, and a "needs manual review" line is logged.
    4. Cleaned up all synthetic test orders and restored real stock afterward.
  - Not handled (out of scope for now, no current need): `checkout.session.expired` / async payment failure events — since no `Order` is created until a session is confirmed `paid`, there's nothing to reconcile for an abandoned or failed session yet. Would matter later if delayed payment methods are added.

## 5a. Production webhook secret still needed *(new — found while doing #5)*
- The `STRIPE_WEBHOOK_SECRET` currently in `.env.local` is a locally-generated dev-only value used to validate the synthetic test event above — it is **not** connected to a real Stripe-registered webhook endpoint.
- Before going live (or testing with real Stripe test-mode checkouts end-to-end), register a webhook endpoint in the Stripe Dashboard pointing at `/api/stripe/webhook` (or run `stripe listen --forward-to localhost:3000/api/stripe/webhook` for local dev, which needs `stripe login` once — interactive, so the user needs to run it themselves) and replace `STRIPE_WEBHOOK_SECRET` with the real signing secret Stripe gives you.

## 6. End-to-end validation pass — DONE
- Manual smoke test: route resolution, CMS product management, checkout redirect, stock decrement, order persistence — the checklist in plan.md's step 8.
- **Route resolution**: `/`, `/magic`, `/palworld` → 200; `/magic/<slug>`, `/palworld/<slug>` → 200; `/pokemon` (no category doc yet) → 404; unknown category/product slugs → 404; `/admin` → 200.
- **Checkout redirect path — real, not synthetic**: user completed an actual Stripe test-mode checkout (card `4242 4242 4242 4242`) through `stripe listen --forward-to localhost:3000/api/stripe/webhook`, got redirected back to the product page with the success banner.
- **Stock decrement + order persistence — confirmed via the genuine Stripe-delivered webhook** (not the synthetic one from step 5): Palworld product stock went 5 → 4, and a real `Order` row was created with the actual session id, correct `amount_total` (14598 = $139.99 + $5.99 shipping), real customer email, and real shipping address (city/country captured correctly).
- Hit two real bugs along the way, both env-file corruption from an editor autosave race (VS Code had `.env.local` open while values were being edited) — `STRIPE_SECRET_KEY` got mangled twice (once ballooning to 128 chars, Stripe's own error confirmed the key was malformed) before landing on the correct 107-char value. Not a code issue, but worth the user's awareness: having `.env.local` open in an editor while a running process's env is being changed externally can cause autosave to clobber concurrent edits.
- plan.md's step 8 checklist is now fully satisfied. All 6 increments in this file are done.

## Remaining known items (not blockers, tracked for later)
- **5a** (production webhook config): the real webhook path is now proven end-to-end via `stripe listen` for local dev. Before deploying, still need a Stripe Dashboard webhook endpoint pointing at the deployed `/api/stripe/webhook` URL, with that environment's own `STRIPE_WEBHOOK_SECRET`.
- **2b** (loose end): `src/data/products.ts`/`categories.ts`/the webhook route still use hand-written local interfaces instead of importing the now-generated types from `src/payload-types.ts`. Low urgency, cosmetic/DRY cleanup.
- Not yet built (beyond plan.md's original 8-step scope, no current need): `pokemon` category doc (type is wired for it, per user's earlier "keep it, build the route now" answer, but no CMS category exists yet); handling for `checkout.session.expired`/async payment failure events.
