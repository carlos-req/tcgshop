---
name: Prism TCG
colors:
  surface: "#111319"
  surface-dim: "#111319"
  surface-bright: "#373940"
  surface-container-lowest: "#0c0e14"
  surface-container-low: "#191b22"
  surface-container: "#1e1f26"
  surface-container-high: "#282a30"
  surface-container-highest: "#33343b"
  on-surface: "#e2e2eb"
  on-surface-variant: "#b9caca"
  inverse-surface: "#e2e2eb"
  inverse-on-surface: "#2e3037"
  outline: "#849495"
  outline-variant: "#3a494a"
  surface-tint: "#00dce5"
  primary: "#e9feff"
  on-primary: "#003739"
  primary-container: "#00f5ff"
  on-primary-container: "#006c71"
  inverse-primary: "#00696e"
  secondary: "#ebb2ff"
  on-secondary: "#520072"
  secondary-container: "#b600f8"
  on-secondary-container: "#fff6fc"
  tertiary: "#fff9f0"
  on-tertiary: "#3a3000"
  tertiary-container: "#ffdb40"
  on-tertiary-container: "#736000"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#63f7ff"
  primary-fixed-dim: "#00dce5"
  on-primary-fixed: "#002021"
  on-primary-fixed-variant: "#004f53"
  secondary-fixed: "#f8d8ff"
  secondary-fixed-dim: "#ebb2ff"
  on-secondary-fixed: "#320047"
  on-secondary-fixed-variant: "#74009f"
  tertiary-fixed: "#ffe16d"
  tertiary-fixed-dim: "#e9c400"
  on-tertiary-fixed: "#221b00"
  on-tertiary-fixed-variant: "#544600"
  background: "#111319"
  on-background: "#e2e2eb"
  surface-variant: "#33343b"
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: "800"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: "800"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: "700"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.0"
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid-margin: 2rem
  gutter: 1.5rem
  unit: 4px
  container-max: 1440px
---

## Brand & Style

This design system is built for a high-fidelity Trading Card Game (TCG) marketplace. It leans into a "Gamer-Chic" aesthetic—a sophisticated evolution of typical gaming interfaces that prioritizes clarity and premium value over clutter.

The style is **Glassmorphic-Modern**. It utilizes deep, layered dark surfaces to provide a high-contrast backdrop for vibrant card art. To evoke the feeling of "pulling a rare card," the UI incorporates subtle luminosity, glowing accents, and translucent materials. The emotional response should be one of "exclusive discovery"—trustworthy enough for high-value transactions, yet energetic enough to match the excitement of a new set release.

## Colors

The palette is anchored in a deep "Obsidian" neutral to ensure card illustrations pop.

- **Primary (Holo-Teal):** Used for primary actions, success states, and rare-tier indicators. It provides a high-energy, digital-first feel.
- **Secondary (Electric Purple):** Used for secondary actions, "Epic" rarity tiers, and deep-layer accents.
- **Tertiary (Neon Gold):** Reserved for "Legendary" status, pre-order callouts, and premium highlights.
- **Backgrounds:** Use a scale of deep grays starting from `#0F1117` (Base) to `#1E2330` (Surface).

Apply subtle glows (box-shadows) using the primary and secondary colors for "Featured" or "Hot" items to mimic the reflective nature of holographic cards.

## Typography

The typography system balances aggressive display presence with utilitarian data density.

- **Headlines:** Sora provides a geometric, bold, and tech-forward feel. Use it for page titles, card names, and price points.
- **Body:** Hanken Grotesk offers exceptional readability for card descriptions, shipping details, and market history.
- **Data/Labels:** JetBrains Mono is utilized for SKU numbers, set codes, and technical card specs (HP, Attack, Year) to provide a "database" aesthetic that collectors appreciate.

Keep line heights tight for headlines to maintain a compact, punchy look.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile.

- **Density:** Use a 4px baseline grid. TCG users prefer high information density to compare prices.
- **Margins:** Desktop uses a generous 32px (2rem) margin to allow the "glow" of glassmorphic cards to bleed without feeling cramped.
- **Card Grids:** Use an aspect-ratio aware grid (typically 2.5:3.5) for card listings. Implement a "masonry-lite" approach for news and articles.

Adaptive logic: On mobile, the card grid should collapse into a 2-column view to preserve card art legibility.

## Elevation & Depth

Hierarchy is established through **Backdrop Blurs** and **Luminous Borders** rather than traditional shadows.

- **Level 0 (Base):** Deep `#0F1117`.
- **Level 1 (Card/Surface):** Semi-transparent obsidian (`rgba(30, 35, 48, 0.7)`) with a 12px backdrop blur.
- **Level 2 (Modals/Popovers):** Higher transparency with a subtle 1px inner border in a low-opacity primary color.
- **The "Glow":** Featured items use a `0px 0px 15px` outer glow in the primary or tertiary color to indicate "In-Stock" or "Legendary" status.

## Shapes

The shape language reflects the physical nature of cards.

- **UI Elements:** Buttons and inputs use a standard `0.5rem` (8px) radius.
- **Cards:** Product cards must use a slightly larger radius (`1rem`) to mirror the die-cut corners of physical trading cards.
- **Interactive States:** On hover, card elements should slightly scale up (1.02x) and increase the intensity of their border glow.

## Components

- **Buttons:**
  - _Primary:_ Solid primary teal with black text for high visibility.
  - _Preorder:_ Secondary purple with a "pulsing" glow animation on the border.
- **Input Fields:**
  - Dark-wash background, no fill. 1px stroke that turns Primary on focus. Use JetBrains Mono for placeholder text.
- **Rarity Chips:**
  - Small, pill-shaped labels with a glassmorphic background and a color-coded dot (Common: White, Rare: Teal, Mythic: Gold).
- **Price Ticker:**
  - A compact list item using Mono fonts to show market trend (Up/Down arrows in Green/Red).
- **Glass Card:**
  - The core component. A container with a `1px` white (opacity 0.1) top-border to catch the "light," creating a 3D glass effect.
- **Notification Toast:**
  - Anchored top-right, featuring a heavy blur and high-contrast primary accent line on the left.
