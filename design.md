---
name: X-Spelled
colors:
  surface: "#15130f"
  surface-dim: "#100e0b"
  surface-bright: "#3a3426"
  surface-container-lowest: "#0d0b08"
  surface-container-low: "#1c1812"
  surface-container: "#221d16"
  surface-container-high: "#2c251c"
  surface-container-highest: "#362d22"
  on-surface: "#ede6d6"
  on-surface-variant: "#b8ad97"
  outline: "#6e6455"
  outline-variant: "#3d362a"
  primary: "#c89b3c"
  primary-dim: "#a67c2e"
  on-primary: "#1c1409"
  on-primary-container: "#7a5a1e"
  secondary: "#ac2712"
  secondary-light: "#d97a5e"
  on-secondary: "#fbede9"
  tertiary: "#3e6b54"
  tertiary-light: "#eaf3ec"
  on-tertiary: "#eaf3ec"
  error: "#d64545"
  background: "#15130f"
  on-background: "#ede6d6"
typography:
  display-lg:
    fontFamily: Fraunces
    fontSize: 52px
    fontWeight: "600"
    lineHeight: "1.05"
    letterSpacing: -0.01em
  display-lg-mobile:
    fontFamily: Fraunces
    fontSize: 36px
    fontWeight: "600"
    lineHeight: "1.15"
  headline-md:
    fontFamily: Fraunces
    fontSize: 26px
    fontWeight: "600"
    lineHeight: "1.25"
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-mono:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.0"
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.625rem
  md: 0.625rem
  lg: 0.875rem
  xl: 1.25rem
  full: 9999px
spacing:
  grid-margin: 2rem
  gutter: 1.5rem
  unit: 4px
  container-max: 1440px
---

## Brand & Style

X-Spelled sells sealed, authenticated trading card game product — booster boxes and packs for Magic: The Gathering, Palworld TCG, and future lines. The core emotional beat isn't "gamer dashboard," it's the **pack-opening moment**: foil, holographic rarity, the ritual of pulling something rare. The design leans into that directly rather than into generic dark-mode SaaS aesthetics.

The style is **Warm Ink & Foil**. A deep, warm near-black (not a cool navy-black) forms the base — like the inside of a sealed booster box — against which muted antique-gold and brick-red accents read as tactile, physical materials rather than glowing UI chrome. Backdrop-blur "glassmorphism" is deliberately avoided; surfaces are solid and card-stock-like, not translucent. The one moment of digital flourish — a mouse-tracked holographic sheen — is reserved for a single signature element (the homepage hero's featured pack), not scattered across the UI.

## Colors

- **Primary (Foil Gold):** primary actions, "in stock" and rare-tier indicators. Muted antique brass rather than neon — reads as premium, not gamer-neon.
- **Secondary (Ember):** preorder/limited-availability callouts, sale tags — a deep brick red, like a wax seal.
- **Tertiary (Pine):** success/availability states.
- **Holo (signature only, not a flat token):** an animated teal→violet→gold sheen used exclusively on the homepage hero's featured-pack element. Never used as a static color anywhere else.
- **Backgrounds:** warm near-black scale from `#0d0b08` (lowest) to `#362d22` (highest container), never cool blue-black.

## Typography

- **Display (Fraunces):** headlines, product names, prices. A real serif with optical-size character — deliberately not a geometric sans, which is the default for this kind of product right now. Used with italics on the brand wordmark and hero headline for a handwritten, "rare pull" warmth.
- **Body (Source Sans 3):** descriptions, shipping/condition copy, everything read at length.
- **Data/Labels (IBM Plex Mono):** SKUs, set/category slugs, prices in dense contexts — a "database" feel for collectors who care about specifics.

## Layout — homepage vs. category page

These two page types have different jobs and must not share one hero:

- **Homepage** sells the *store*: a full-width brand hero (headline + the signature holo-tilt pack), a trust strip, "Shop by game" as large editorial category tiles (not a product grid), and a "New arrivals" row.
- **Category page** sells *browsing speed*: a slim one-line strip (name + product count, no cinematic hero), a sticky filter/sort bar, and a dense product grid.
- **Product page**: image, name, price, buy action, plus a short authenticity/condition note — the collector-trust equivalent of a return policy blurb.

## Shape & elevation

- Cards use a `0.625rem`–`0.875rem` radius — enough to feel considered, not the near-full-round "app icon" look.
- Elevation comes from a 1px `outline-variant` border and a soft drop shadow on hover (`tcg-card-hover`), not glow/blur effects.
- The signature `foil-tilt` + `holo-sheen` treatment (mouse-tracked 3D tilt + animated holographic gradient sweep) is the one place motion is spent boldly — everywhere else stays calm, respects `prefers-reduced-motion`, and uses restrained hover transitions only.

## Components

- **Buttons:** primary is solid foil-gold with dark ink text; preorder is ember with a slow pulse (no neon glow); disabled/out-of-stock is a flat muted surface tone.
- **Rarity/status:** communicated through color (gold = in stock, ember = preorder, muted = out of stock) rather than decorative badges.
- **Cards:** solid `surface-container` background, 1px outline border, lift + border-color shift on hover — no backdrop blur.
