# TODO — remaining work

Status reflects what's actually in the codebase as of 2026-09-04. Completed phases/items (catalog + CMS + Stripe checkout foundation, Supabase Postgres migration, `Customers` collection + account pages, multi-item cart, order history, legal pages, SEO/accessibility pass, Media S3 storage, production `DATABASE_URL` pooler fix, 2b type cleanup, Resend email adapter + order confirmation email, Sentry error monitoring on checkout + webhook routes) are done — see git history, `plan.md`, and `plan-v2.md` for details.

## Loose ends
- Not yet built (beyond original scope, no current need): handling for `checkout.session.expired`/async payment failure events in the Stripe webhook route (still only handles `checkout.session.completed`).

## Pre-launch checklist
- ~~Clear separation of test vs. live Stripe keys per environment.~~ Done — production uses live `STRIPE_SECRET_KEY`, local dev stays on `sk_test_...`.
- ~~Production Stripe webhook endpoint registered in the Stripe Dashboard, pointing at the deployed `/api/stripe/webhook` URL with that environment's own `STRIPE_WEBHOOK_SECRET`.~~ Done.
- ~~Error/monitoring for `/api/checkout` and the webhook route beyond console logs.~~ Done — `@sentry/nextjs` wired up (`instrumentation.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`), with explicit `Sentry.captureException`/`captureMessage` calls on the swallowed-error paths in the webhook handler (order create failure, confirmation email failure, stock decrement failure, unrecognized line items) and the checkout route's missing-session-URL case. Needs a `SENTRY_DSN` from a (free-tier) Sentry project — placeholder added to `.env.local`, currently blank.
- Confirm Supabase's backup/PITR settings.
- Manual keyboard/screen-reader pass on the mobile menu and cart-drawer focus trap — verified structurally but not yet in an actual browser.
