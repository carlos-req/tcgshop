# Product catalog + CMS + Stripe implementation plan

## Decisions captured

- Canonical storefront route pattern: `/{tcg-slug}/{product-slug}`
- CMS approach: Payload integrated into the same Next.js app
- Checkout phase 1: single-product Stripe checkout first

## Goals

- Support 100+ products with slug-based routes and a predictable hierarchy
- Manage inventory, media, and product metadata from a CMS rather than hardcoded source files
- Allow product purchase via Stripe without making the CMS a bottleneck
- Keep the storefront fast and SEO-friendly with route-driven product pages

## Architecture direction

### 1) Catalog URL and data model

Use a category + product slug structure that looks like this:

- `/pokemon/charizard`
- `/magic/modern-horizons-3`
- `/palworld/dawn-of-palpagos`

Rules:

- Category slug is unique and canonical (`pokemon`, `magic`, `palworld`)
- Product slug is unique within its category
- Product routes resolve to one CMS record only
- Missing product/category routes return a 404 page with a safe fallback
- Product cards and homepage links should use slug-based navigation instead of static IDs

### 2) CMS choice and setup

Payload is the right fit here because it:

- works well with Next.js
- offers flexible collections for products, categories, media, and orders
- supports image management and metadata out of the box
- is straightforward to extend with custom validation and admin workflows
- pairs cleanly with Stripe webhooks and commerce flows

Implementation: integrate Payload directly into this repository instead of a separate service.

### 3) Product data model

The CMS should own:

- `id`
- `name`
- `slug`
- `category` relation
- `sku` or product code
- `description`
- `price`
- `originalPrice` (optional)
- `stock` / inventory count
- `status` (`in_stock`, `coming_soon`, `out_of_stock`)
- `featured` flag
- `images` / media references
- `stripeProductId` and `stripePriceId` (if using Stripe price management)
- `published` state

This avoids placing the storefront’s source of truth in `src/data/products.ts` or embedded static config.

### 4) Frontend catalog routes

The storefront should be driven by dynamic routes and server-side data fetching.

Planned structure:

- `/[categorySlug]/[productSlug]` for product details
- `/[categorySlug]` for category pages
- `/` home page with product highlights

This allows the user flow to be:

- home page or category page → product card click → slug route → product detail page

The homepage/category list should be generated from CMS data, not static arrays.

### 5) Stripe checkout phase 1

For the first version, implement single-product checkout only.

Flow:

- Product detail page has a Buy / Add to Cart / Checkout action
- Server endpoint creates a Stripe Checkout Session using the CMS-backed product
- Customer is redirected to Stripe
- Successful payment returns to success/cancel states in the storefront

Important validation:

- Do not allow checkout if product is out of stock
- Confirm stock is checked server-side before creating the Stripe session
- Use CMS data as the pricing source, not browser state

### 6) Stripe webhook and order processing

When Stripe payment succeeds:

- confirm order payload
- save order record in the CMS or a dedicated orders collection
- decrement product stock or mark the product unavailable based on business rules
- handle failed/cancelled payment states without decrementing inventory

This is the critical point where product status and inventory stay in sync with real commerce events.

## Implementation plan

1. Define catalog URL and slug rules
   - Enforce `/{tcg-slug}/{product-slug}`
   - Validate uniqueness and fallback behavior

2. Set up Payload in the app
   - Add Payload config
   - Configure admin route and local dev environment

3. Create CMS collections
   - Categories
   - Products
   - Media
   - Orders

4. Replace static product source
   - Move from hardcoded `src/data/products.ts` to CMS-driven data fetches
   - Update home/category/listing components

5. Create dynamic slug pages
   - Add category pages and product detail pages
   - Ensure navigation uses slug routing across the site

6. Implement Stripe checkout session flow
   - Create checkout API route for a single product
   - Connect product detail page to Stripe checkout

7. Add Stripe webhook handling
   - Process successful checkout events
   - Update order and stock state in CMS

8. Validate end-to-end behavior
   - Route resolution
   - CMS product management
   - checkout redirect path
   - stock decrements and order persistence

## Notes and constraints

- Keep the category taxonomy extensible beyond just Pokemon, Magic, and Palworld
- CMS should remain the source of truth for availability and product metadata
- Prefer server-side fetching for product prices and inventory
- Use Stripe price IDs and product IDs stored in CMS for cleaner commerce management
- Keep the first checkout flow intentionally limited to one-item purchases to reduce scope and risk

## Recommended next step

Start by creating the Payload foundation and the category/product schema, then switch the storefront to slug-driven dynamic routes and data queries. Once the catalog is fully CMS-backed, implement the Stripe checkout flow and webhook ordering logic.
