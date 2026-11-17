# How to contribute

Thanks for helping with the H/F Sonora site. The flow is the same for people and for AI agents.

## The flow

1. **Open an issue** (or pick one). Use a template: "Nuevo evento" or "Cambio al sitio".
2. **Create a branch** from `main`: `evento/2027-01-28-buqui-bichi`, `fix/menu-movil`, `feat/galeria`.
3. **Make the change** and run `npm run build`.
4. **Open a pull request.** GitHub runs the build automatically; it must be green.
5. **Review.** Rafa (or the co-host maintainer) looks at it and approves. Nobody merges their own PR into `main` without a review.
6. **Merge.** On merge, the site deploys itself within about 2 minutes.

## Commit messages

Short, in the present tense, with a type in front (Conventional Commits):

```
evento: agrega 2027-01-28 en Buqui Bichi
fix: el botón de Luma no cabía en 360 px
feat: galería de fotos en la página del evento
docs: explica cómo subir fotos
chore: actualiza Astro
```

## Setup

```bash
git clone <repo-url>
cd hf-sonora-web
npm ci
npm run dev
```

Node 22 (see `.nvmrc`).

## Style

- Prettier formats the code (`npm run format`). Don't fight it.
- Look and feel: `DESIGN.md`.
- Agent rules (they apply to humans too): `AGENTS.md`.
