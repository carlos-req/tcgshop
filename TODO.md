# TODO — remaining work

Status reflects what's actually in the codebase as of 2026-09-04. Completed phases/items (catalog + CMS + Stripe checkout foundation, Supabase Postgres migration, `Customers` collection + account pages, multi-item cart, order history, legal pages, SEO/accessibility pass, Media S3 storage, production `DATABASE_URL` pooler fix, 2b type cleanup, Resend email adapter + order confirmation email, Sentry error monitoring on checkout + webhook routes) are done — see git history, `plan.md`, and `plan-v2.md` for details.

## Pre-launch checklist

- Manual keyboard/screen-reader pass on the mobile menu and cart drawer, in an actual browser (Chrome extension wasn't connected to do this via automation). Note: while reviewing, found and fixed a real gap — `CartDrawer.tsx` had `aria-modal="true"` but no actual Tab-key focus trap, so Tab could escape the dialog into the page behind it; added a trap that cycles focus between the first/last focusable elements. The mobile menu isn't a modal (no `role="dialog"`), so no trap is needed there.
