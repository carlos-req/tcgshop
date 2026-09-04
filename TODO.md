# TODO — remaining work

Status reflects what's actually in the codebase as of 2026-09-04. Completed phases/items (catalog + CMS + Stripe checkout foundation, Supabase Postgres migration, `Customers` collection + account pages, multi-item cart, order history, legal pages, SEO/accessibility pass, Media S3 storage, production `DATABASE_URL` pooler fix, 2b type cleanup, Resend email adapter + order confirmation email, Sentry error monitoring on checkout + webhook routes) are done — see git history, `plan.md`, and `plan-v2.md` for details.

## Loose ends

- Not yet built (beyond original scope, no current need): handling for `checkout.session.expired`/async payment failure events in the Stripe webhook route (still only handles `checkout.session.completed`).

## Pre-launch checklist

- Manual keyboard/screen-reader pass on the mobile menu and cart-drawer focus trap — verified structurally but not yet in an actual browser.
