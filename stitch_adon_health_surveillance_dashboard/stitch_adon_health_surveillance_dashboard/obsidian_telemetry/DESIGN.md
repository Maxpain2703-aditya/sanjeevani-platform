---
name: Obsidian Telemetry
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#47464a'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#78767b'
  outline-variant: '#c8c5ca'
  surface-tint: '#5f5e60'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1d'
  on-primary-container: '#858386'
  inverse-primary: '#c8c6c8'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e1e4'
  primary-fixed-dim: '#c8c6c8'
  on-primary-fixed: '#1c1b1d'
  on-primary-fixed-variant: '#474649'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system draws inspiration from dual-pane split architectures: balancing sterile, clinical precision with deep obsidian console command surfaces. It targets enterprise healthcare operators, clinical researchers, and health telemetry engineers who require uncompromising legibility and operational gravitas. 

The aesthetic is Modern High-Contrast Minimalist fused with subtle Glassmorphic depth. Visual surfaces lean into two extremes: crisp, airy clinical whites (`#ffffff`, `#f8fafc`) for operational data entry, paired with deep matte obsidian frames (`#09090b`, `#111115`) for telemetry observation, node routing, and system monitoring. The system conveys reliability, high surgical fidelity, and state-of-the-art technological advancement.

## Colors

The palette establishes an architectural dichotomy between deep obsidian voids and pure luminescent clinical backdrops:

- **Primary (`#09090b`)**: The grounding obsidian black. Used for high-impact buttons, headers on light themes, and the comprehensive backdrop for command center consoles.
- **Secondary (`#0ea5e9`)**: Cyan-cerulean telemetry glow. Denotes active routing nodes, pulse indicators, dynamic traces, focus rings, and primary interactive highlights.
- **Tertiary (`#10b981`)**: Bio-vitality emerald. Used for healthy node telemetry, verified clinical states, and successful validations.
- **Neutral (`#64748b`)**: Refined slate neutral used for muted captions, input icons, secondary metrics, and hairline borders (`#e2e8f0` on light surfaces; `#27272a` on dark consoles).

Color tokens adapt contextually: primary light panels utilize `#ffffff` surface with `#09090b` ink, while telemetry panels operate within a dark token scope (`#09090b` canvas, `#18181b` cards, `#fafafa` ink).

## Typography

The typographic hierarchy combines **Plus Jakarta Sans** for structural headlines and display narratives with **Inter** for dense, clinical UI text, telemetry data readouts, and forms.

- **Display & Headlines**: Styled in Plus Jakarta Sans with tight negative tracking (`-0.02em` to `-0.01em`) to create a solid, engineered posture.
- **Body & Data Points**: Inter ensures maximum glyph disambiguation across dense clinical tables, micro-labels, and input fields.
- **Telemetry Readouts**: Small caps, tabular numerals (`font-variant-numeric: tabular-nums`), and explicit letter-spacing are applied to micro labels and status counters to preserve vertical column alignment during dynamic metric shifts.

## Layout & Spacing

The layout is built upon an 8pt base grid with a distinctive dual-viewport split capability:

- **Desktop (1024px and above)**: Supports 50/50 or 45/55 asymmetric split viewports. Left pane houses focused interaction surfaces (such as authentication or node parameter configuration) with generous padding; right pane renders dark obsidian telemetry canvas wrapped within subtle rounded framing (`rounded-2xl`).
- **Tablet (768px - 1023px)**: Condenses gutters to `1rem` and stacks split panes into top/bottom segmented workflows or slide-out obsidian drawer consoles.
- **Mobile (< 768px)**: Unified vertical stack with `1rem` screen margin. Complex canvas graphics convert into swipeable preview cards or drill-down modal layers.
- **Component Rhythm**: Internal component padding follows `space-xs` (4px) to `space-xl` (40px) scaling, preventing dense clinical data from feeling cluttered while maintaining tight vertical alignment across form controls.

## Elevation & Depth

Visual hierarchy leverages crisp hairline boundaries rather than heavy drop shadows:

- **Clinical Light Panels**: Surfaces utilize a subtle 1px border (`#e2e8f0` or `#f1f5f9`) combined with an ultra-soft, diffused shadow: `0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.02)`.
- **Obsidian Dark Surfaces**: Layers build depth through tonal stepping: canvas at `#09090b`, floating tool rails and node panels at `#141418` with 1px border `#27272a`.
- **Glow & Interactive Elevation**: Active nodes, focused primary buttons, and live telemetry pulses leverage ambient light rings (`0 0 16px -2px rgba(14, 165, 233, 0.35)` or dark obsidian button halos `0 12px 24px -6px rgba(0, 0, 0, 0.35)`), reinforcing a high-tech instrument feel.

## Shapes

The design system utilizes level 2 roundedness (`0.5rem` / `8px` base corner radius), paired with selective pill-radius forms:

- **Inputs, Buttons, and System Tiles**: `0.75rem` (12px) to `1rem` (16px) corner radius, creating a comfortable, tactile feel that offsets high-contrast technical data.
- **Status Badges & Pill Chips**: Full curvature (`9999px`) for telemetry indicators, node status badges, and tab switchers.
- **Major Panes & Canvas Windows**: Generous `1.25rem` to `1.5rem` (20px - 24px) border radiuses for macro-containers, framing embedded dark telemetry consoles cleanly inside bright surroundings.

## Components

### Buttons
- **Primary**: Deep obsidian background (`#09090b`), high-contrast white text, subtle top inner-bevel highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.15)`), and smooth corner radius (`0.75rem`). Hover introduces an ambient dark lift shadow.
- **Secondary / Social / Utility**: Light background (`#ffffff`), 1px neutral border (`#e2e8f0`), neutral-900 typography, accompanied by left-aligned iconography.
- **Obsidian Console Actions**: Translucent dark surfaces (`rgba(255, 255, 255, 0.06)`), hairline borders (`rgba(255, 255, 255, 0.1)`), light glyphs, with hover state brightening to `rgba(255, 255, 255, 0.12)`.

### Input Fields
- Enclosed with 1px soft hairline borders (`#e2e8f0`), `0.75rem` corner radius, `0.75rem` vertical by `1rem` horizontal padding.
- Left-aligned utility icons rendered in muted slate (`#94a3b8`).
- Focus state activates a 1px border `#09090b` alongside an ethereal outer ring: `0 0 0 3px rgba(9, 9, 11, 0.08)`.

### Chips & Pill Badges
- Strict `9999px` pill contours.
- Telemetry chips feature an embedded 6px vital dot (e.g., emerald green `#10b981` with subtle pulse animation).
- Backgrounds use 10% opacity tints of the semantic token with matching solid border and label text.

### Cards & Container Panels
- Segmented into two main species:
  - **Clinical Light Cards**: White canvas, `1rem` radius, 1px border `#f1f5f9`, soft ambient elevation.
  - **Node Telemetry Panels**: Obsidian background (`#111115`), `1px` border (`#27272a`), containing micro grid patterns or flow connectors for medical telemetry logic.

### Checkboxes & Radios
- Square with `0.375rem` rounding for checkboxes; pure circular for radio controls.
- Hairline stroke in rest state; deep obsidian fill with white check/dot icon when active.

### Telemetry Node Rail
- Floating vertical dock with integrated navigation icons housed inside rounded pill or squircle carriers.
- Active states feature secondary cyan glows (`#0ea5e9`) and elevated contrast indicators against the dark telemetry backdrop.