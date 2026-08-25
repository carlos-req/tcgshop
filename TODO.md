# TODO — remaining work from plan.md

Increments sized for one or two prompts each, in dependency order. Status reflects what's actually in the codebase as of 2026-08-24. Items 1–6 (Orders collection, CMS data swap, seeding, type generation, lint fix, slug-based routes, Stripe checkout + webhook, end-to-end validation) are complete — see git history / plan.md for details.

## Remaining known items (not blockers, tracked for later)
- **5a** (production webhook config): the real webhook path is proven end-to-end via `stripe listen` for local dev. Before deploying, still need a Stripe Dashboard webhook endpoint pointing at the deployed `/api/stripe/webhook` URL, with that environment's own `STRIPE_WEBHOOK_SECRET`.
- **2b** (loose end): `src/data/products.ts`/`categories.ts`/the webhook route still use hand-written local interfaces instead of importing the generated types from `src/payload-types.ts`. Low urgency, cosmetic/DRY cleanup.
- Not yet built (beyond plan.md's original 8-step scope, no current need): `pokemon` category doc (type is wired for it, but no CMS category exists yet); handling for `checkout.session.expired`/async payment failure events.

---

# Phase 2 — see `plan-v2.md`

Decisions locked in: Supabase for Postgres hosting only (not auth); a separate `Customers` collection for shopper accounts (never the same login as admin `Users`); design pass starts now, in parallel with the rest; legal pages get scaffolded with placeholder text, not real copy.

## 7. Design pass — homepage/category hierarchy
- Homepage and category pages currently share one generic `HeroSection` + `ProductCardSection` layout with no real distinction between "landing page" and "browse this category." Overall look reads as templated/AI-generated.
- Use the `frontend-design` skill. In scope: homepage, category page, product detail page, shared header/footer/hero. Out of scope: Payload's admin UI.
- **Done** — merged via PR #7 (`design/homepage-category-hierarchy`, commit 8e18e99): `HomeHero`, `CategoryStrip`, `ShopByGame`, `NewArrivals`, `HoloCard` components, `(frontend)/layout.tsx`, gold/bold design pass, `DESIGN-GUIDE.md`.

## 8. Supabase Postgres migration
- Provision a Supabase Postgres database, point `DATABASE_URL` at it, verify all collections (including the new `Customers` from #9) come up clean against it.
- Decide re-seed vs. dump/restore for current dev data (likely re-seed, given today's data is two demo products).
- **Not started.**

## 9. `Customers` collection (separate from admin `Users`)
- New Payload collection, `auth: true`, for shopper accounts — never the same collection/login as staff `Users`.
- Fields: first/last name, email (auth field), password (auth field), mobile phone, shipping address.
- Customer-facing login/signup/logout pages under `(frontend)`, plus an editable `/account` profile page (name, phone, shipping address).
- **Done** (branch `feature/auth`, pushed, not yet merged): `src/collections/Customers.ts`; `/login`, `/signup`, `/account` pages; server actions for login/signup/logout/profile update; access control scoped to each customer's own record (verified: cross-customer update returns 403).

## 10. Multi-item cart
- The biggest lift in phase 2. There is currently no cart at all — checkout is a single "Buy Now" flow (`/api/checkout` takes one product, quantity hardcoded to `1`).
- Needs: client-side cart state persisted to `localStorage` (add/remove/adjust quantity), a cart UI (drawer or page), `/api/checkout` extended to accept an array of `{ productId, quantity }` line items, and the webhook's stock-decrement + `Order`-creation logic extended to handle multiple line items per session instead of one.
- **Done** (branch `feature/auth`, not yet merged): `CartProvider`/`useCart` (`src/lib/cart-context.tsx`) holds cart state in a reducer, persisted to `localStorage`; slide-out `CartDrawer` opened from a new header cart icon; `AddToCartButton` replaces the old instant-checkout `BuyButton` everywhere (in-stock and preorder items both add to cart, per decision). `Orders.lineItems` is now an array field (was a single `product`/`quantity` pair); `/api/checkout` accepts `{ items: [{ categorySlug, productSlug, quantity }] }`, validates each against live stock/status; the webhook re-fetches actual purchased items via `stripe.checkout.sessions.listLineItems` (not client-supplied metadata) and decrements stock per line item. Success/cancel now redirect to generic `/checkout/success` (clears the cart) and `/checkout/cancelled` (cart preserved) instead of back to a single product page. Verified end-to-end with a real Stripe test-mode session (multi-item, mixed in-stock + preorder) and a signed synthetic webhook event: order + line items + stock decrement + `/account/orders` rendering, and cross-customer isolation, all correct.

## 11. Orders linked to customers + order history
- Add a `customer` relationship field to `Orders` (optional, since guest checkout must keep working).
- Stamp the logged-in customer's id into Checkout Session metadata at checkout time (same mechanism as `productId`/`categorySlug`/`productSlug` today), so the webhook can link the resulting order.
- New authenticated route (e.g. `/account/orders`) showing a customer's own order history.
- **Important pre-existing gap to fix as part of this**: `Orders.access.read` currently allows *any* logged-in user to read *any* order (`Boolean(user)`) — that was fine when only admin staff could log in, but the moment `Customers` (#9) exists, this must be scoped so a customer can only ever read their own orders.
- **Done** (branch `feature/auth`, not yet merged): `customer` relation on `Orders`; `/api/checkout` stamps `customerId` into session metadata when logged in; webhook links the resulting order; `Orders.access` scoped (admins full access, customers only `{ customer: { equals: user.id } }`, guest orders admin-only); `/account` shows a 3-order preview with "View all", full history at `/account/orders`. Verified: cross-customer reads return zero docs / 403 on write.

## 12. Legal pages (scaffolded, not real legal text)
- Privacy Policy, Terms of Service, Returns/Refund Policy, and a cookie notice if analytics/tracking is ever added.
- Scaffolded routes with clearly-marked placeholder copy describing what each policy needs to cover — not binding legal text. Real copy needs actual legal review before launch.
- **Done** (branch `feature/auth`, not yet merged): `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/returns-policy`, linked from the footer (which also gained a "Legal" links row — "Returns & Authenticity" now points at the real Returns Policy page instead of a dead `/support/returns` link). Shared `legal/layout.tsx` renders a "draft placeholder, not binding" notice on every page. Cookie notice still skipped — no analytics/tracking in the app yet, per plan.
- **Also added**: `COMPANY_NAME` constant in `src/lib/site.ts`, used only in the legal-page copy (by design — header/footer/page `<title>`s keep the literal "X-Spelled" brand name, which is a separate concern from the legal entity name referenced in policy text).

## 13. Pre-launch checklist
- **Order confirmation email**: no email adapter is configured yet (`No email adapter provided` warning on startup) — the checkout success banner already claims "you'll receive a confirmation email shortly," which isn't true today. Needs a real adapter (e.g. Resend, Postmark) in `payload.config.ts`.
- Clear separation of test vs. live Stripe keys per environment.
- Production Stripe webhook endpoint registered in the Dashboard (this is #5a above, carried forward).
- SEO basics: `robots.txt`, sitemap, Open Graph images (per-page metadata already exists via `generateMetadata`).
- Error/monitoring for `/api/checkout` and the webhook route beyond console logs.
- Confirm Supabase's backup/PITR settings once #8 is done.
- Accessibility pass (keyboard nav, focus states, alt-text spot check) — natural to fold into #7's design pass.
- **Not started.**
