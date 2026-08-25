# Design system — how to keep tweaking it yourself

This is a practical map of where the design lives in code, so you can keep adjusting it without me. `design.md` is the "why" (brand direction, philosophy); this is the "where do I click."

## The three files that control almost everything

1. **`src/app/globals.css`** — every color, font, radius, and reusable visual effect (cards, buttons, the hero cross-fade, the holo signature). This is 90% of what you'll touch.
2. **`src/app/(frontend)/layout.tsx`** — which Google Fonts are loaded.
3. **Individual component files** (`src/components/*.tsx`) — layout/structure and which Tailwind classes get applied. Most of them just reference the tokens from `globals.css` (`bg-primary`, `text-on-surface`, etc.) rather than hardcoding colors, so changing a token in one place updates it everywhere automatically.

## Changing colors

Open `globals.css`, find the `@theme` block at the top. Every color is a named token:

| Token | Current role | Used for |
|---|---|---|
| `--color-surface` | `#15130f` (warm near-black) | Page background |
| `--color-primary` / `--color-primary-dim` | `#c89b3c` / `#a67c2e` (foil gold) | Buy buttons, links, "in stock" |
| `--color-secondary` | `#b23a2e` (ember/brick) | Preorder button |
| `--color-tertiary` | `#3e6b54` (pine) | Reserved for success states (barely used yet) |
| `--color-on-surface` / `--color-on-surface-variant` | `#ede6d6` / `#b8ad97` | Primary text / muted text |
| `--color-outline` / `--color-outline-variant` | Borders and dividers |

To retheme: change the hex values here. Because components use semantic classes like `bg-primary` and `text-on-surface` instead of raw hex codes, editing these ~10 values re-colors the entire site. You don't need to hunt through component files unless you want to change *which* token something uses (e.g. make the preorder button gold instead of ember).

If you want a genuinely different palette (not just retuning the current warm-ink one), the fastest way to explore is: pick 4–6 new hex values, drop them in, run `npm run dev`, and look at the homepage + a category page + a product page. That's enough surface area to judge a palette.

## Changing fonts

Two places, must be changed together:

1. `src/app/(frontend)/layout.tsx` — swap the `next/font/google` imports (currently `Fraunces`, `Source_Sans_3`, `IBM_Plex_Mono`) for whatever you want. Any font on [fonts.google.com](https://fonts.google.com) works the same way — import it, give it a `variable` name.
2. `src/app/globals.css` — update `--font-display`, `--font-body`, `--font-mono` in the `@theme` block to reference the new variable names.

Current roles: **display** = headlines/product names/prices (currently Fraunces, a serif), **body** = paragraphs (Source Sans 3), **mono** = SKUs/data-flavored bits only (IBM Plex Mono) — deliberately *not* used for marketing copy anymore, see the "friendlier" section below.

## The "how formal vs. friendly" dial

A few things in `globals.css` and components control how buttoned-up vs. casual the site reads. If you want to push further in either direction:

- **Corner radius** — `--radius-md/lg/xl` in `@theme`. Bigger = friendlier/softer. Currently `0.75rem`–`1.5rem`.
- **Card borders** — `.tcg-card` in `globals.css`. Currently a subtle 1px border, no shadow at rest. Remove the border entirely (rely on background contrast only) for even flatter/more minimal; add a shadow for more "premium/elevated."
- **Mono/uppercase labels** — `.text-label-mono` (formal, data-flavored — SKUs, the 404 code) vs. `.text-eyebrow` (friendly, sentence-case — section labels like "Shop by game"). If something feels too stiff, check whether it's using `text-label-mono` and switch it to `text-eyebrow` or plain text.
- **Buttons** — currently `rounded-full` (pill-shaped) with no glow/shadow effects. Was previously boxier with glow — if you want more visual weight back, `.glow-gold`/`.glow-pine`/`.preorder-pulse` utilities were removed but the pattern (a `box-shadow` utility class) is easy to re-add in `globals.css` if you want that punch back for a specific element.

## Where each page's layout lives

- **Homepage** (`src/app/(frontend)/page.tsx`) — assembles `HomeHero` + `TrustBar` + `ShopByGame` + `NewArrivals`. Reorder, remove, or add sections here.
- **Category page** (`src/app/(frontend)/[categorySlug]/page.tsx`) — `CategoryStrip` + `ProductCardSection`. Deliberately no big hero — see `plan-v2.md` for why homepage/category are meant to feel different.
- **Product page** (`src/app/(frontend)/[categorySlug]/[productSlug]/page.tsx`) — image, name, price, buy button, stock note, authenticity note.
- **`HomeHero.tsx`** — the cross-fading background image + headline + the signature `HoloCard`. If you add a third category, you'll want a third background image in the cross-fade rotation (currently hardcoded to the two existing banner URLs).
- **`ProductCard.tsx`** — the grid tile used on category pages and "New arrivals." Image is `aspect-square` by design (`aspect-square` class on the `<Link>` wrapping the image) — if it still doesn't read as square enough, the culprit is usually the text block below it getting tall, not the image itself.

## The one deliberately "loud" thing: `HoloCard.tsx`

This is the mouse-tracked holographic tilt effect on the homepage hero — the single spot where the design takes a visual risk, on purpose (see `design.md`'s "spend your boldness in one place" note). Everything else on the site is calmer by design. If you want to tone it down, `MAX_TILT_DEG` in `HoloCard.tsx` controls how dramatic the tilt is; the shimmer opacity is in `.holo-sheen` in `globals.css`.

## Before you call a change done

- `npm run dev` and actually look at the homepage, a category page, and a product page — changes to `globals.css` tokens affect all three at once, and something that looks right on one can look wrong on another.
- `npx tsc --noEmit` and `npm run lint` — cheap to run, catches typos/unused-import mistakes fast.
- Check it doesn't break at mobile width (resize the browser or use dev tools' device toolbar) — nothing in the current layout requires JS-driven responsive logic, it's all Tailwind breakpoint classes, but it's easy to introduce something that only looks right at desktop width.

## If you want a genuinely different direction, not just tuning

Everything above is about turning dials on the current "warm ink & foil" system. If instead you want to explore a fundamentally different aesthetic (different mood entirely, not just different hex values), that's a bigger conversation worth having with me directly rather than solo — reach for the `frontend-design` skill again and describe the new direction, and we'll do the brainstorm/plan/critique pass the same way we did this one, rather than iterating blind on top of tokens built for a different premise.
