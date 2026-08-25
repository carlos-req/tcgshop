# TODO — remaining work from plan.md

Increments sized for one or two prompts each, in dependency order. Status reflects what's actually in the codebase as of 2026-08-25. Items 1–6 (Orders collection, CMS data swap, seeding, type generation, lint fix, slug-based routes, Stripe checkout + webhook, end-to-end validation) are complete — see git history / plan.md for details.

## Remaining known items (not blockers, tracked for later)
- **5a** (production webhook config): the real webhook path is proven end-to-end via `stripe listen` for local dev. Before deploying, still need a Stripe Dashboard webhook endpoint pointing at the deployed `/api/stripe/webhook` URL, with that environment's own `STRIPE_WEBHOOK_SECRET`.
- **2b** (loose end): `src/data/products.ts`/`categories.ts`/the webhook route still use hand-written local interfaces instead of importing the generated types from `src/payload-types.ts`. Low urgency, cosmetic/DRY cleanup.
- Not yet built (beyond plan.md's original 8-step scope, no current need): `pokemon` category doc (type is wired for it, but no CMS category exists yet); handling for `checkout.session.expired`/async payment failure events.

---

# Phase 2 — see `plan-v2.md`

Decisions locked in: Supabase for Postgres hosting only (not auth); a separate `Customers` collection for shopper accounts (never the same login as admin `Users`); design pass starts now, in parallel with the rest; legal pages get scaffolded with placeholder text, not real copy.

Items 7 (design pass), 9 (`Customers` collection + account pages), 10 (multi-item cart), 11 (orders linked to customers + order history), and 12 (legal pages) are complete — merged via PR #7 and PR #8 (`feature/auth`). See git history for details.

## 8. Supabase Postgres migration
- Provision a Supabase Postgres database, point `DATABASE_URL` at it, verify all collections (including `Customers`) come up clean against it.
- Decide re-seed vs. dump/restore for current dev data (likely re-seed, given today's data is two demo products).
- **Not started.**

## 13. Pre-launch checklist
- **Order confirmation email**: no email adapter is configured yet (`No email adapter provided` warning on startup) — the checkout success banner already claims "you'll receive a confirmation email shortly," which isn't true today. Needs a real adapter (e.g. Resend, Postmark) in `payload.config.ts`. **Not started.**
- Clear separation of test vs. live Stripe keys per environment. **Not started.**
- Production Stripe webhook endpoint registered in the Dashboard (this is #5a above, carried forward). **Not started.**
- Error/monitoring for `/api/checkout` and the webhook route beyond console logs. **Not started.**
- Confirm Supabase's backup/PITR settings once #8 is done. **Not started.**
- SEO basics and an accessibility pass are done — see git history. One follow-up remains: the mobile menu and cart-drawer focus trap were verified structurally but not in an actual browser (no browser extension connected when built) — worth a manual keyboard/screen-reader pass before launch.
