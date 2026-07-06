# Lumenosis Design System

## Brand Positioning
AI-powered real estate front-desk platform. Editorial, authoritative, warm — not SaaS-cold. Think: boutique agency meets modern AI infrastructure.

---

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-cream` | `#f5f4ee` | Page background (light) |
| `--color-ink-charcoal` | `#1a1a1a` | Body text, headings |
| `--color-primary-indigo` | `#1e1b4b` | Deep accent, CTAs on light bg |
| `--color-brand-violet` | `#cb6ce6` | Primary brand accent, highlights, active states |
| `--color-brand-violet-soft` | `rgba(203,108,230,0.12)` | Tinted backgrounds, hover states |
| `--color-gold-italic` | `#9a7a3e` | Iris agent accent, editorial gold |
| `--color-dark-section` | `#0f1612` | Dark section backgrounds |
| `--color-line` | `#e2ddd1` | Dividers, borders |

**Dark mode overrides:** Background goes transparent (dark bg from parent), ink flips to `#ffffff`, indigo and violet become the same `#cb6ce6`.

---

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | Newsreader (serif) | 400–600 | Italic for emphasis, editorial feel |
| Body | Inter | 400–600 | Clean, readable at all sizes |
| Mono | JetBrains Mono | 400 | Code snippets, terminal |
| Eyebrow | Inter | 600 | All-caps, 0.75rem, tight tracking |

### Type Scale
```
Hero display:   clamp(2.5rem, 7vw, 5.5rem)
Section title:  clamp(2rem, 4.5vw, 3.5rem)
Body large:     1.1875rem
Body:           1rem
Eyebrow:        0.75rem
```

---

## Spacing

- Base unit: `4px` (0.25rem)
- Section padding: `py-24` to `py-32` (96–128px)
- Component gap: `gap-8` to `gap-16` (32–64px)
- Content max-width: `max-w-6xl` (72rem) centered

---

## Radius & Shadows

| Token | Value |
|---|---|
| `--radius` | `0.625rem` (10px) — cards, inputs |
| `--radius-pill` | `999px` — badges, pill buttons |
| `--shadow-soft` | `0 18px 45px rgba(17,21,19,0.08)` |
| `--shadow-glow-violet` | `0 0 60px rgba(203,108,230,0.45)` — hero glow |

---

## Component Vocabulary

### Eyebrow Label
```tsx
<span className="text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-[var(--color-brand-violet)]">
  Label
</span>
```

### Section Heading
```tsx
<h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
  Heading
</h2>
```

### Primary CTA Button
```tsx
<button className="bg-[var(--color-brand-violet)] text-white font-semibold px-8 py-3.5 rounded-[var(--radius-pill)] hover:opacity-90 transition-opacity">
  Get Started
</button>
```

### Ghost Button
```tsx
<button className="border border-[var(--color-line)] text-[var(--color-ink-charcoal)] font-semibold px-8 py-3.5 rounded-[var(--radius-pill)] hover:border-[var(--color-brand-violet)] transition-colors">
  Learn More
</button>
```

### Card
```tsx
<div className="bg-white rounded-[var(--radius)] shadow-[var(--shadow-soft)] p-8 border border-[var(--color-line)]">
```

### Dark Section
```tsx
<section className="bg-[var(--color-dark-section)] text-white">
```

---

## Agent Accents

| Agent | Colour |
|---|---|
| Iris (email) | `--color-gold-italic` `#9a7a3e` |
| Theo (SMS/WhatsApp) | `--color-brand-violet` `#cb6ce6` |
| Aria (voice) | `--color-primary-indigo` `#1e1b4b` |
| Olivia (chat) | cyan `#06b6d4` |

---

## Layout Patterns

- **Hero:** Full-width, cream bg, large serif headline, violet glow behind key word, dual CTA row
- **Feature sections:** Alternating text/visual, 2-col grid at `md:`, eyebrow + heading + body + CTA
- **Dark bands:** Used for social proof, pricing, and final CTA — break cream monotony
- **Trust strip:** Single row of logos, muted opacity, thin top/bottom border
- **Cards:** White on cream, soft shadow, no heavy border — feels like paper layers

---

## Anti-Patterns (never use)

- `border-radius > 16px` on section containers
- `transition: all` — always specify property
- `#3B82F6` blue — not in this palette
- Inter as display font — serif (Newsreader) for all large headings
- `max-w-screen-xl` or `max-w-7xl` — use `max-w-6xl`
- Gradient backgrounds on hero (use solid cream + glow shadow instead)
- Card grids more than 3-col at desktop
