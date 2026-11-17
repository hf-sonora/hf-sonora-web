# AGENTS.md — rules for AI agents working on this repo

This file is read by Claude Code, Codex, Cursor and other coding agents. Humans: read it too, it's short.

## What this is

The website of Hackers/Founders Sonora, the monthly startup bar night in Hermosillo. Static site built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions. Spanish (es-MX).

## Before you change anything

1. Read `DESIGN.md` (look and feel) and `CONTRIBUTING.md` (how changes get in).
2. Work on a branch, never on `main`. Open a pull request. A human (Rafa or a maintainer) approves every merge.
3. One change per pull request. Small is better.

## Commands

```bash
npm ci            # install exact versions from package-lock.json
npm run dev       # local preview at http://localhost:4321
npm run build     # type-check + build; must pass before you open a PR
npm run format    # Prettier
```

## Where things are

| Path                       | What                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src/content/eventos/*.md` | One file per meetup. The file name is the URL slug (`AAAA-MM-DD-lugar`). Fields are validated by `src/content.config.ts`. |
| `src/pages/`               | Pages: home, `/eventos`, `/eventos/<slug>`, 404                                                                           |
| `src/components/`          | Header, Footer, Logo, EventCard                                                                                           |
| `src/styles/global.css`    | Design tokens and base styles                                                                                             |
| `src/lib/time.ts`          | Hermosillo time helpers. Use them for every date.                                                                         |
| `src/lib/site.ts`          | Site name, social links, contact info                                                                                     |
| `public/img/`              | Images. Events go in `public/img/events/`                                                                                 |

## Hard rules

- **Never publish, store or commit an attendee list**, RSVP export, emails or phone numbers of attendees. RSVPs live only in Luma.
- **Never commit secrets** (API keys, tokens, `.env` files).
- All dates in **America/Hermosillo** (UTC−7, no daylight saving) via `src/lib/time.ts`.
- No tracking pixels (Facebook, Google Ads). Analytics, if added, must be cookie-free.
- Don't add new dependencies without saying why in the PR.
- Spanish copy uses informal "tú". Don't rewrite copy Rafa or Eddy wrote unless asked.

## How to add a meetup (the most common task)

1. Copy the latest file in `src/content/eventos/` to `AAAA-MM-DD-lugar.md`.
2. Change the fields (date, start, venue, address, `maps_url`, `rsvp_url`) and the text below the `---`.
3. Put the cover in `public/img/events/AAAA-MM-DD-lugar.png` (1080 × 1080).
4. `npm run build` must pass. Open a PR titled `evento: AAAA-MM-DD lugar`.

The site moves past events to "Anteriores" by itself: it rebuilds every night at 00:05 Hermosillo time.

## Pull request checklist

- [ ] `npm run build` passes
- [ ] Looked at it at 375 px and desktop width
- [ ] No attendee data, no secrets
- [ ] DESIGN.md updated if the change adds a color, font or component
