# DESIGN.md — H/F Sonora

The design system for the H/F Sonora website, written in the DESIGN.md format (the plain-text design file that AI coding agents read before touching UI, popularized by Google Stitch and the `awesome-design-md` collection). Humans and agents follow the same file.

**Source of truth for the brand:** [hf.cx](https://hf.cx/), the H/F headquarters site. Values below were read from its live CSS on 2026-11-17 (Elementor global tokens). The chapter keeps the same look so a visitor coming from hf.cx feels at home.

All tokens live in `src/styles/global.css`. Change them there, never inline.

---

## 1. Visual theme and atmosphere

Black, white and one hot orange. Confident, informal, a bit punk: "Being a tech startup founder sucks sometimes; H/F can make it suck less." Big bold headlines, lots of black space, the orange slash from the logo as the only decoration. It should feel like a bar night, not a conference.

- Dark first. Most sections are black with white text.
- Light sections (white) alternate to break up long pages.
- One orange accent per screen area. Orange is a highlight, not a background color for large areas (exception: the venue panel on event pages).

## 2. Color palette and roles

| Token            | Hex       | Role                                                                                     |
| ---------------- | --------- | ---------------------------------------------------------------------------------------- |
| `--ink`          | `#000000` | Page background; text on light sections                                                  |
| `--ink-2`        | `#0d0d0d` | Raised panels (event card) on black                                                      |
| `--line`         | `#262626` | Hairlines and card borders on black                                                      |
| `--paper`        | `#ffffff` | Text on black; light section background                                                  |
| `--paper-2`      | `#f4f4f4` | Alternate light background                                                               |
| `--muted`        | `#a3a3a3` | Secondary text on black                                                                  |
| `--muted-light`  | `#5e5e5e` | Secondary text on white (from hf.cx)                                                     |
| `--orange`       | `#ff5800` | H/F accent (hf.cx `--e-global-color-accent`): slash, primary buttons, labels, focus ring |
| `--orange-hover` | `#ff7a33` | Hover on primary buttons                                                                 |

**Contrast rules (WCAG AA):**

- Orange on black: 6.7:1, OK for any text.
- White on orange: 3.2:1, **only large text** (≥ 19 px bold or ≥ 24 px). That's why buttons use 19 px bold.
- Orange on white: 3.2:1, headings and decoration only, never body text.

**Retired:** the navy `#2f364b` / coral `#f05a5b` palette from the 2021–24 Sonora posts. Don't use it on the site.

## 3. Typography

| Role                                  | Font        | Weight | Size (mobile → desktop)                            |
| ------------------------------------- | ----------- | ------ | -------------------------------------------------- |
| H1                                    | Roboto      | 700    | 44 → 94 px, line-height 1.02, tracking −0.02em     |
| H2                                    | Roboto      | 700    | 32 → 60 px                                         |
| H3                                    | Roboto      | 700    | 24 px                                              |
| Body                                  | Roboto      | 400    | 17 px, line-height 1.6, max 62 characters per line |
| Buttons                               | Roboto      | 700    | 19 px                                              |
| Labels (dates, times, tags, eyebrows) | Roboto Mono | 700    | 13–14 px, UPPERCASE, tracking 0.08em               |

hf.cx uses Roboto (primary 600, accent 500, body 400). Fonts are **self-hosted** through `@fontsource` (no calls to Google, faster, more private).

## 4. Components

### Logo

The official hf.cx wordmark image (`public/img/hf-logo.webp`, white letters with the orange slash) followed by `SONORA` in Roboto Mono, orange, tracked out. Black backgrounds only. Never recolor the slash, never stretch the image.

### Buttons

- **Primary:** orange fill, white 19 px bold text, pill radius 30 px (as on hf.cx), min height 52 px.
- **Ghost:** transparent, 2 px border in the current text color. Hover inverts.
- Always a real `<a>` or `<button>`. Thumb-sized.

### Event card (`src/components/EventCard.astro`)

Panel `--ink-2`, 1 px `--line` border, 4 px orange left border, 6 px radius. Orange mono label (`PRÓXIMO MEETUP`), date in orange mono + time in white, venue name as big uppercase H2, address muted, primary "Aparta tu lugar →" (Luma) and ghost "Cómo llegar" (Google Maps). Empty state: "Muy pronto" plus an Instagram button.

### Section heading

A short orange skewed slash (14 × 34 px, skew −28°) above a left-aligned H2. It echoes the slash in the logo.

### Venue panel (event page)

Orange background, black text, venue name uppercase, ghost "Abrir en Maps".

### Photo grid

Square crops, 2 columns mobile / 3 desktop, mono caption `3 DIC 2026 · LA CINCO`. Lazy-loaded, WebP, under ~200 KB each.

## 5. Layout principles

- Mobile first, designed at 375 px. Must work at 360 px with no sideways scroll.
- Max content width 1120 px; side gutter 16 px mobile, 32 px desktop.
- 8 px spacing grid (`--s-1` … `--s-12`). Sections have 96 px vertical padding.
- The next-meetup card must be fully visible on a 375 × 667 phone without scrolling.

## 6. Depth and elevation

Flat. No drop shadows. Depth comes from black vs `--ink-2` panels and 1 px `--line` borders. Sticky header uses 88% black with a light blur.

## 7. Motion

Minimal: color transitions of 150 ms on hover. Respect `prefers-reduced-motion` (already global). No parallax, no autoplay carousels.

## 8. Imagery

Real photos from our nights only. No stock photos, no people in suits. Darken photos 50–60% when text sits on top. Every image has alt text in Spanish.

## 9. Voice and language

- Spanish (es-MX), informal "tú". Short sentences. "Cheve" and "plática" are welcome.
- Dates: `JUEVES 3 DE DICIEMBRE`, times `6:00 PM`, always **Hermosillo time** (America/Hermosillo, UTC−7, no DST). Use `src/lib/time.ts`, never the visitor's time zone.

## 10. Do's and don'ts

**Do**

- Use tokens from `global.css`.
- Keep one primary button per section.
- Check contrast when you put text on orange.

**Don't**

- Don't introduce new colors, fonts or shadows without updating this file first.
- Don't use HF Capital's look (mint green, Outfit font). Different brand.
- Don't put orange body text on white.
- Don't publish anything about attendees. Ever.

## 11. Agent prompt guide

When asked to build or change UI here:

1. Read this file and `src/styles/global.css` first.
2. Reuse existing components before writing new ones.
3. Check the result at 375 px and 1280 px.
4. If the request needs something this file doesn't cover, propose the addition to this file in the same pull request.
