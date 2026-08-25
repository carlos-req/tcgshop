# Phase 2: accounts, cart, design, and launch readiness

`plan.md` covered phase 1 (catalog + CMS + single-item Stripe checkout) and is complete — see `TODO.md`. This document covers what's next.

## Decisions captured

- **Supabase**: hosted Postgres only. Swap `DATABASE_URL` to a Supabase-hosted connection string; Payload's Postgres adapter doesn't care who's hosting it. Supabase Auth is **not** used — Payload already has its own auth system, and running two identity providers (Payload admin auth + Supabase customer auth) would mean reconciling two separate user stores for no real benefit here.
- **Customer accounts**: a new Payload collection, `Customers` (`auth: true`), fully separate from the existing `Users` collection (store staff / admin panel access). A customer account and a staff account are never the same record, and a customer login has no path to `/admin`.
- **Cart**: there is currently no multi-item cart — phase 1 shipped a single "Buy Now" flow (`/api/checkout` takes one `categorySlug`/`productSlug`, `quantity` is hardcoded to `1`). "Save cart to localStorage" is a bigger change than it sounds: it means building an actual multi-item cart (add/remove/adjust quantity) backed by `localStorage`, and extending `/api/checkout` to accept multiple line items instead of one.
- **Design**: the homepage and category pages currently render the same `HeroSection` + `ProductCardSection` layout with no real visual hierarchy between them, and the overall look reads as generic/templated. This phase includes an actual design pass (using the `frontend-design` skill), not just new features bolted onto the current layout.
- **Legal pages**: scaffolded routes with clearly-marked placeholder copy, not real legal text. Neither `plan.md`'s author nor this assistant is qualified to write binding privacy/terms language — real copy needs actual legal review before launch, informed by the site's actual data practices (Stripe, any analytics, cookies, email).

## Architecture direction

### 1) Supabase migration

- Provision a Supabase Postgres database, point `DATABASE_URL` at it.
- Run existing Payload migrations/schema push against it, verify all collections (`Users`, `Media`, `Categories`, `Products`, `Orders`, and the new `Customers`) come up clean.
- Decide on a migration path for the current local dev data (re-seed vs. dump/restore) — likely re-seed, given today's dev data is just two demo products.

### 2) Customer accounts (`Customers` collection)

- New collection: `email`, `auth: true`, plus whatever profile fields are actually needed (name, default shipping address — keep minimal at first).
- Customer-facing login/signup pages under the storefront (`(frontend)` route group), separate from `/admin`.
- Checkout needs to know whether a customer is logged in, so an order can be associated with them — guest checkout should still work (email-only, per phase 1), with the order linked to a customer account only if one is logged in at checkout time.

### 3) Orders linked to customers + order history

- Add a `customer` relationship field to the `Orders` collection (optional — guest orders have no customer).
- Webhook (`/api/stripe/webhook`) needs the logged-in customer's id at checkout time to stamp it into Checkout Session metadata, the same way `productId`/`categorySlug`/`productSlug` are passed today.
- New authenticated route (e.g. `/account/orders`) showing a customer's own order history, reading from `Orders` filtered by `customer`. Access control must ensure a customer can only ever see their own orders (unlike today's `Orders.access.read`, which is "any logged-in user" — that check was written assuming only admin staff can log in, and does not hold once customer accounts exist).

### 4) Multi-item cart

- Client-side cart state, persisted to `localStorage`, keyed by product id + quantity.
- Cart UI: add-to-cart from product cards/detail pages, a cart view (drawer or page) to adjust quantities/remove items, and a real checkout entry point from the cart.
- `/api/checkout` needs to accept an array of `{ productId, quantity }` line items instead of a single product — stock/status validation and Stripe `line_items` construction both need to loop over the cart instead of assuming one item.
- The webhook's stock decrement and `Order` creation also need to handle multiple line items per session instead of the current single-`product`/`quantity` assumption.

### 5) Design pass

- Homepage and category pages should not share one generic layout — give the homepage its own hierarchy (e.g. a real landing experience: multiple featured categories, brand story, trust signals) distinct from a category page's job (browse/filter one category's catalog).
- Use the `frontend-design` skill for aesthetic direction, typography, and layout decisions rather than iterating on the current templated look.
- In scope: homepage, category page, product detail page, and the shared header/footer/hero component set. Out of scope for this pass: the Payload admin UI (that's Payload's own design system).

### 6) Pre-launch checklist

Beyond the four features above, things worth closing out before this goes live for real customers and real money:

- **Order confirmation email**: Payload currently logs a `No email adapter provided` warning on startup — the checkout success banner already tells customers "you'll receive a confirmation email shortly," which isn't true yet. Needs a real email adapter (e.g. Resend, Postmark) wired into `payload.config.ts`.
- **Live vs. test Stripe keys**: a clear, documented separation between test-mode and live-mode `STRIPE_SECRET_KEY`/`STRIPE_WEBHOOK_SECRET` per environment, so a live key never accidentally ends up in a dev/staging environment.
- **Production Stripe webhook**: register a real Dashboard webhook endpoint pointing at the deployed URL (tracked as item 5a in `TODO.md`).
- **Legal/compliance pages**: Privacy Policy, Terms of Service, Returns/Refund Policy, and a cookie notice if any analytics/tracking is added — scaffolded now, real text before launch (see Decisions above).
- **SEO basics**: `robots.txt`, sitemap, per-page metadata (partially done — category/product pages already have `generateMetadata`), Open Graph images.
- **Error/monitoring**: some way to know when `/api/checkout` or the webhook is failing in production, not just console logs.
- **Database backups**: confirm Supabase's backup/PITR settings meet whatever risk tolerance is acceptable for order data.
- **Accessibility pass**: keyboard navigation, focus states, alt text coverage (images already require `alt` at the `Media` collection level, worth spot-checking in the new design pass).

## Notes and constraints

- Keep guest checkout working — requiring an account to buy anything is a bigger, separate product decision, not assumed here.
- `Orders.access.read` must be revisited the moment `Customers` exists (see section 3) — today's `Boolean(user)` check would let a customer read *any* order if it isn't fixed first.
- The multi-item cart is the single biggest scope item here; everything else is additive to what exists, but the cart touches checkout, the webhook, and the Orders shape all at once.

## Recommended next step

Start with the design pass (homepage/category hierarchy), since it doesn't depend on Supabase or auth being in place and can happen in parallel with those decisions settling. Sequence the rest as: Supabase migration → `Customers` collection → cart (the biggest lift) → orders-linked-to-customers/order history → legal page scaffolding → pre-launch checklist.
