# TODO — remaining work

Status reflects what's actually in the codebase as of 2026-08-26. Completed phases/items (catalog + CMS + Stripe checkout foundation, Supabase Postgres migration, `Customers` collection + account pages, multi-item cart, order history, legal pages, SEO/accessibility pass, Media S3 storage, production `DATABASE_URL` pooler fix, 2b type cleanup) are done — see git history, `plan.md`, and `plan-v2.md` for details.

## Loose ends
- Not yet built (beyond original scope, no current need): handling for `checkout.session.expired`/async payment failure events in the Stripe webhook route (still only handles `checkout.session.completed`).

## Pre-launch checklist
- **Order confirmation email**: no email adapter is configured yet (`No email adapter provided` warning on startup) — the checkout success banner already claims "you'll receive a confirmation email shortly," which isn't true today. Needs a real adapter (e.g. Resend, Postmark) in `payload.config.ts`.
- Clear separation of test vs. live Stripe keys per environment.
- Production Stripe webhook endpoint registered in the Stripe Dashboard, pointing at the deployed `/api/stripe/webhook` URL with that environment's own `STRIPE_WEBHOOK_SECRET`. (The webhook path itself is proven end-to-end via `stripe listen` for local dev.)
- Error/monitoring for `/api/checkout` and the webhook route beyond console logs.
- Confirm Supabase's backup/PITR settings.
- Manual keyboard/screen-reader pass on the mobile menu and cart-drawer focus trap — verified structurally but not yet in an actual browser.
