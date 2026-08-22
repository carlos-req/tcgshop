# tcgshop

A storefront for selling trading card game booster packs and bundles (Magic: The Gathering, Palworld TCG, and more), built on Next.js with Payload CMS for catalog/inventory management and Stripe for checkout.

Products, categories, stock, and media are all managed from the Payload admin panel — no code changes needed to add a new item or TCG line. Checkout is a single-item Stripe Checkout flow; a webhook records the order and decrements stock atomically once payment succeeds.

## Tech stack

- **Next.js 16** (App Router, webpack — not Turbopack, see [Notes](#notes))
- **Payload CMS 3** with the Postgres adapter, embedded directly in this app (not a separate service)
- **Stripe** for Checkout Sessions and webhook-driven order fulfillment
- **Tailwind CSS 4**
- **TypeScript**, **ESLint** (flat config), **Prettier**

## Features

- Category + product catalog, fully CMS-driven — `/{category-slug}` and `/{category-slug}/{product-slug}` routes resolve dynamically against Payload data, with a proper 404 for unknown slugs
- Single-product Stripe Checkout with server-side stock validation, US shipping address collection, and a flat shipping rate
- Webhook-driven order fulfillment: verifies the Stripe signature, records an `Order`, and atomically decrements product stock (`WHERE stock >= quantity`) so concurrent checkouts can't oversell the last unit
- Idempotent webhook handling — a duplicate delivery of the same Stripe event is a safe no-op
- Featured-product wiring on the homepage/category hero banners, driven by a `featured` flag on products

## Getting started

### Prerequisites

- Node.js 22+
- Docker (for local Postgres)
- A Stripe account (test mode is fine)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```bash
   PAYLOAD_SECRET=some-long-random-string
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
   DB_PASSWORD=postgres
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

   `STRIPE_WEBHOOK_SECRET` isn't needed until you're testing checkout end-to-end (see [Stripe webhook (local dev)](#stripe-webhook-local-dev) below).

3. Start Postgres:

   ```bash
   docker compose --env-file .env.local up -d
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000/admin](http://localhost:3000/admin) to create your first admin user, then add a `Category` and a `Product` (with an uploaded image) to see the storefront populate.

### Generating Payload types

```bash
npm run generate:types
```

Writes `src/payload-types.ts` from your current collections. Re-run this whenever you change a collection's fields.

### Stripe webhook (local dev)

To exercise the checkout → webhook → order/stock flow locally, forward Stripe events to your dev server with the [Stripe CLI](https://docs.stripe.com/stripe-cli):

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

`stripe listen` prints a webhook signing secret — put that in `.env.local` as `STRIPE_WEBHOOK_SECRET` and restart `npm run dev`. You can then complete a real checkout with Stripe's test card `4242 4242 4242 4242` (any future expiry, any CVC/ZIP) and watch the order land in `/admin`.

## Environment variables

| Variable                | Used by                     | Notes                                                              |
| ------------------------ | ---------------------------- | -------------------------------------------------------------------- |
| `PAYLOAD_SECRET`         | Payload                     | Any long random string for local dev                                |
| `DATABASE_URL`           | Payload's Postgres adapter  | Falls back to the local Docker Postgres if unset — set a real value for anything beyond local dev |
| `DB_PASSWORD`            | `docker-compose.yml`        | Password for the local Postgres container                          |
| `STRIPE_SECRET_KEY`      | `/api/checkout`             | Stripe secret key (test or live)                                    |
| `STRIPE_WEBHOOK_SECRET`  | `/api/stripe/webhook`       | Signing secret from `stripe listen` (dev) or a Stripe Dashboard webhook endpoint (production) |

## Scripts

| Script                    | Purpose                                          |
| -------------------------- | ------------------------------------------------- |
| `npm run dev`              | Start the dev server                              |
| `npm run build`            | Production build                                  |
| `npm run start`            | Run a production build                            |
| `npm run lint`             | ESLint                                            |
| `npm run format`           | Format with Prettier                              |
| `npm run format:check`     | Check formatting without writing                   |
| `npm run payload`          | Payload CLI passthrough                            |
| `npm run generate:types`   | Regenerate `src/payload-types.ts`                  |
| `npm run generate:importmap` | Regenerate Payload's admin import map           |

## Project structure

```
src/
  app/
    (frontend)/            # public storefront — dynamic category/product routes, checkout + webhook API routes
    (payload)/              # Payload's admin UI and REST/GraphQL API mount
  collections/              # Payload collection configs (Users, Media, Categories, Products, Orders)
  components/                # Storefront UI components
  data/                       # Server-side data access (Payload local API queries)
  lib/                         # Stripe client, Payload client, inventory helpers, shared display formatting
  payload.config.ts            # Payload configuration
```

## Content model

- **Categories** — `name`, `slug`, `description`. The top-level TCG/product-line grouping that drives the catalog's URL structure; open-ended, add a new one from `/admin` any time.
- **Products** — `name`, `slug`, `category` (relation), `sku`, `description`, `price`, `originalPrice`, `stock`, `status` (`in_stock` / `coming_soon` / `out_of_stock`), `featured`, `images`, `stripeProductId`, `stripePriceId`.
- **Orders** — written only by the Stripe webhook (not user-creatable via the API): Stripe session/payment intent IDs, the purchased product, quantity, amount, customer email, shipping address, and status. Read/update restricted to logged-in admin users.
- **Media** — image uploads referenced by `Products.images`.

A product needs a `stripePriceId` (a Price created in your Stripe dashboard) before it can be checked out — the checkout route returns a 422 otherwise.

## Notes

- `next dev`/`next build` are pinned to `--webpack`, not Turbopack.
- This is a very recent Next.js release with some behavior that differs from older docs/training data — see `AGENTS.md`.
- `plan.md` documents the original architecture/roadmap; `TODO.md` tracks what's built against it.

## License

MIT — see [LICENSE](./LICENSE).
