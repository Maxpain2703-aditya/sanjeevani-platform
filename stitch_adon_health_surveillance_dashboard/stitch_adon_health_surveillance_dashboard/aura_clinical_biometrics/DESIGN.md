---
name: Clinical Biometric Grid
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#111c2e'
  on-primary-container: '#7a849b'
  inverse-primary: '#bcc7df'
  secondary: '#b61722'
  on-secondary: '#ffffff'
  secondary-container: '#da3437'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2fc'
  primary-fixed-dim: '#bcc7df'
  on-primary-fixed: '#111c2e'
  on-primary-fixed-variant: '#3d475b'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930013'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  surface-card: '#ffffff'
  surface-canvas: '#f8fafc'
  surface-hero-dark: '#140404'
  hero-gradient-from: '#2a0808'
  hero-gradient-via: '#3d1212'
  hero-gradient-to: '#1a0404'
  crimson-glow: '#f87171'
  crimson-muted: '#fda4af'
  border-subtle: '#e2e8f0'
  text-primary: '#0f172a'
  text-muted: '#64748b'
  status-active: '#10b981'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '300'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.875rem
    fontWeight: '300'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '300'
    lineHeight: 2rem
    letterSpacing: -0.02em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
  code-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The aesthetic balances life-critical precision and institutional authority with modern biomedical high-tech interfaces. Designed for high-stress, rapid-response medical and surveillance contexts (such as emergency healthcare telemetry networks), the visual language evokes clinical reliability, high encryption, and immediate spatial clarity.

The visual style is a hybrid of **Clean Clinical Minimalism** and **Technical Glassmorphism**:
- Primary functional zones use clean, high-legibility light mode surfaces with delicate borders and restrained typography.
- Contextual visual telemetry zones leverage deep obsidian-to-crimson gradients with radiant ambient glows, luminous wireframe vector overlays, and monospaced telemetry indicators.
- Precision detailing (hairline dividers, subtle status dots, technical badge telemetry) conveys zero-latency responsiveness and DISHA/HIPAA-grade compliance.

## Colors
The palette leverages a stark contrast between a high-key, distraction-free functional workspace and a focused, deep-crimson technical data console.

- **Primary (`#091426` / Slate 900):** Deep near-black slate used for high-emphasis typography, primary user action surfaces, and focused states.
- **Secondary (`#ef4444` / Crimson Red):** Vital telemetry, urgent node signals, biometric indicator pulses, and interactive focal points within the dark dashboard segment.
- **Tertiary (`#10b981` / Emerald):** Nominal node connectivity, positive authentication confirmations, and system health status.
- **Neutral Surface Palette (`#f8fafc` to `#ffffff`):** Multi-layered neutral foundation giving breathability, backed by ambient radial warm and cool gradients (`rgba(187, 247, 208, 0.4)` and `rgba(254, 240, 138, 0.35)`).
- **Hero Canvas Gradients:** Dark crimson shades (`#2a0808` to `#140404`) that house luminous vector waveforms and wireframe bio-telemetry.

## Typography
Typographic rhythm depends on pairing an airy, lightweight geometric grotesque (**Plus Jakarta Sans**) for headlines and navigational elements with an optimized, neutral workhorse (**Inter**) for data forms, descriptions, and legal footnotes. Monospaced elements are reserved for status markers, encryption notes, and real-time latency readouts.

- **Headings:** Set intentionally light (`font-weight: 300`) with tight tracking to maintain clinical calmness even at display scale.
- **Inputs & Labels:** Explicit medium weights (`font-weight: 500` to `600`) with high-contrast text ensure zero ambiguity in data entry.
- **Telemetry & Microcopy:** Rendered between 10px and 11px with uppercase letter spacing (`letterSpacing: 0.05em`) for military/clinical dispatch clarity.

## Layout & Spacing
The layout implements a unified dual-pane structural grid encased within a central elevated master modal:

- **Desktop (>= 1024px):** Split 48% / 52% asymmetric 2-column flex or CSS Grid layout within a max-width container (`1120px`). The left container serves visual telemetry and brand status, while the right container encapsulates the interaction form.
- **Mobile (< 1024px):** Linear stacked orientation where the visual hero panel sits above the functional form panel, scaling down padding from `2.5rem` (`40px`) to `1rem` (`16px`).
- **Vertical Spacing:** Follows a strict 4px/8px modular scale. Form fields maintain `1rem` vertical separation, while section modules use `1.5rem` to `2.5rem` margins to prevent cognitive fatigue.

## Elevation & Depth
Elevation is achieved using ambient light dispersal and translucent layered planes rather than high-contrast dropshadows:

- **Base Ambient Shadow:** The primary modal rests on `box-shadow: 0 20px 50px -12px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(226, 232, 240, 0.8)`, combining a wide-spread low-opacity slate shadow with an architectural hairline outline.
- **Glassmorphic Hero Surface:** Employs backdrop-blur filters (`backdrop-blur-xl`) with low-opacity dark translucent layers (`rgba(0, 0, 0, 0.2)` to `rgba(255, 255, 255, 0.1)`) over multi-layered SVG wireframes and localized blurs (`blur-3xl`).
- **Interactive Depth:** Input fields are indented tonally using recessed background fills (`#f8fafc`) that lift to pure `#ffffff` when active/focused.

## Shapes
The design balances soft modern roundedness with structural rigor:
- **Master Outer Container:** Generously rounded at `1.5rem` (24px) for desktop frames to soften large viewport bounds.
- **Cards & Internal Panels:** Rounded at `1rem` (16px) for interior visual tiles and telemetry groups.
- **Controls & Form Inputs:** Set consistently to `0.75rem` (12px) for balanced touch ergonomics and clinical precision.
- **Status Badges & Indicator Dots:** Fully circular (`rounded-full`) to contrast against rectangular fields.

## Components

### Buttons
- **Primary CTA:** Styled in deep obsidian slate (`#091426` / `bg-slate-900`), `height: 3rem`, `rounded-xl`, high contrast white text with an accompanying directional arrow icon. Supports an interactive active state with a micro-scale shift (`active:scale-[0.99]`).
- **Text & Ghost Links:** Rendered in neutral slate with underline offsets or discrete hover color shifts (`hover:text-slate-900`).

### Input Fields
- **Container:** Background initialized to `slate-50/80` with a 1px border (`border-slate-200`).
- **Focus State:** Transitions smoothly to pure white background with a sharp slate border (`focus:border-slate-800`), eliminating generic colored outline rings in favor of crisp architectural strokes.
- **Trailing Actions:** Password visibility toggles and contextual icons sit inside the field margin, sized at 16px with low-contrast muted tones.

### Badges & Telemetry Chips
- **Live State Badge:** Translucent pill background (`bg-white/10` with `backdrop-blur-md`), hairline white border, containing a pulsing `1.5` dot with status text in `11px`.
- **Telemetry Data Blocks:** Modular tiles with rounded-xl corners, dark translucent fill (`bg-black/20`), hairline border, pairing an uppercase micro-label with high-contrast data values.

### Cards
- **Enclosure:** Hybrid structural card with a dual-sided split: one half containing rich atmospheric visual telemetry and the other containing high-clarity data inputs, separated without hard heavy dividing lines.