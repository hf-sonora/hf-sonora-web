# AGENTS.md — rules for AI agents working on this repo

This file is read by Claude Code, Codex, Cursor and other coding agents. Humans: read it too, it's short.

## What this is

The website of Hackers/Founders Sonora, the monthly startup bar night in Hermosillo. Static site built with [Astro](https://astro.build), deployed to Hostinger (https://hackersfounders.mx) by GitHub Actions. Spanish (es-MX).

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

## When you run as the GitHub agent (Sonorus)

Your name is **Sonorus**. People call you by writing "Sonorus" in an issue or comment (never "@sonorus": that's someone else's GitHub account). End every comment you post with `— Sonorus 🤖`.

You are the web developer for H/F Sonora. Rafa asks for things in issues and comments, in Spanish, and he is not a programmer.

1. **Answer in Spanish, in plain words.** No jargon. Say what you changed, not how the code works.
2. **Don't guess on facts.** If a date, time, venue, address, link, price, name or piece of copy is missing or ambiguous, stop and ask before changing anything. Post one comment that starts with `❓ Necesito tu respuesta` and lists each question as a checkbox with your suggested default, for example:
   - [ ] Hora de fin: ¿9:00 PM? (si no contestas, uso 9:00 PM)
         Also add the label so it shows on the project board: `gh issue edit <number> --add-label esperando-a-rafa`. Then end your run. When Rafa answers (his comment starts with "Sonorus") and you continue, remove it first: `gh issue edit <number> --remove-label esperando-a-rafa`.
3. **Design choices you may make yourself**, as long as they follow `DESIGN.md`. Mention them in the PR so Rafa can say no.
4. **Always finish by opening the pull request yourself** with `gh pr create --base main` (don't just post a "Create PR" link: Rafa only sees screenshots once the PR exists). If a PR for your branch already exists, update it instead. Open it against `main`, titled in the Conventional Commits style (`evento: …`, `fix: …`, `feat: …`), with `Closes #<issue>` in the body. Never push to `main`.
5. **Run `npm run build` before you finish.** If it fails, fix it; don't open a broken PR.
6. Screenshots are added to every PR automatically by the Preview workflow; don't make your own. The project board (github.com/orgs/hf-sonora/projects/1) moves cards by itself: new issue → Por hacer, PR linked → Para revisar, merged/closed → Publicado.
7. Keep the change to what was asked. Suggest extra ideas in the PR description instead of doing them.

## Pull request checklist

- [ ] `npm run build` passes
- [ ] Looked at it at 375 px and desktop width
- [ ] No attendee data, no secrets
- [ ] DESIGN.md updated if the change adds a color, font or component
