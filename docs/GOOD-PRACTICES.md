# Good practices, in plain words

For Rafa (and anyone new). No programming background needed.

## The big picture

```
 You / Eddy / the agent
        │  propose a change
        ▼
  Branch  ──►  Pull request  ──►  Automatic check (CI)  ──►  You approve  ──►  main  ──►  Live site
 (a copy)      (the proposal,      (does it build?           (one click,        (the       (updates in
               with screenshots)    any secrets?)             phone works)       truth)     ~2 minutes)
```

Nothing reaches the live site without passing the check **and** your approval. That is the whole safety system.

## The 10 practices

1. **`main` is sacred.** It is always the version that is live. Nobody edits it directly, not you, not the engineer, not the agent. GitHub enforces this ("branch protection").
2. **Every change is a pull request (PR).** A PR is a proposal: "here's what I changed and why." You can read it, comment, and press **Approve** or **Request changes**, even from the GitHub app on your phone.
3. **Small changes.** One PR = one thing (a new event, a fixed button). Easy to review, easy to undo.
4. **Automatic checks (CI).** Every PR gets built by GitHub. If something is broken (a typo in a date, a missing field), it turns red and can't be merged.
5. **Issues are the to-do list.** Ideas, bugs and new events go in Issues, with templates so nothing is forgotten. The agent will work from Issues.
6. **The design lives in one file.** `DESIGN.md` says what colors, fonts and components are allowed. Agents read it first, so the site stays consistent no matter who (or what) edits it.
7. **Rules for agents live in one file.** `AGENTS.md`. Every AI tool (Claude, Codex, Cursor) reads it.
8. **No secrets, no attendee data in the repo.** Ever. The repo is public. CI blocks obvious mistakes.
9. **Everything is undoable.** Git keeps every version. A bad change is reverted in one click.
10. **Dependencies stay updated by a bot.** Dependabot opens a PR once a month to update libraries. You approve it like any other PR.

## Roles

| Who                  | Can do                                                      |
| -------------------- | ----------------------------------------------------------- |
| **Rafa**             | Owner. Approves and merges. Settings.                       |
| **Eddy**             | Maintainer. Approves and merges.                            |
| **Co-host engineer** | Collaborator: branches + PRs. Can be made maintainer later. |
| **The agent**        | Opens branches and PRs only. Can never merge. You approve.  |

## The roadmap to your visual agent

**Phase 1 (now): the foundation.** Repo, design file, agent rules, automatic checks, auto-deploy. Done in this repo.

**Phase 2: the agent works from Issues.** Install the Claude GitHub app on the repo. Then you write an issue ("agrega el evento de enero en Buqui Bichi", with the photo dragged in) and tag `@claude`. The agent creates a branch, makes the change, and opens a PR.

**Phase 3: visual approval.** Each PR gets a **preview link** (a private copy of the site with the change) and **screenshots** posted as a comment: phone and desktop. You look at pictures, not code, and press Approve or Request changes. If you request changes, you write what's wrong in plain Spanish and the agent fixes it.

**Phase 4: the agent asks you.** The agent posts questions as comments with checkboxes ("¿Hora de fin: 9 PM o hasta que cierre?") and waits for your answer before continuing. A GitHub Project board shows every task as a card: To do → Agent working → Waiting for Rafa → Done. That board is your visual dashboard; it works on the phone.

Phase 2–4 are all GitHub features plus the Claude GitHub integration, so there's nothing extra to host or pay for at first.

## How to use the agent (day to day)

1. Go to the repo → **Issues** → **New issue** → pick **Nuevo evento** or **Cambio al sitio**. Fill it in, drag in images, and write `@claude` anywhere in the text. (You can do this from the GitHub phone app.)
2. Within a minute the agent replies on the issue. If something is missing, it asks you with checkboxes (`❓ Necesito tu respuesta`). Answer in a comment that starts with `@claude`.
3. When it's done, it opens a **pull request**. A few minutes later a comment appears with **screenshots on phone and desktop**.
4. Look at the pictures:
   - Good → **Merge pull request**. The live site updates in ~2 minutes.
   - Not quite → comment `@claude` + what to change ("el botón más grande", "cambia la hora a 7 PM"). It updates the same PR and new screenshots appear.
5. Only people you've added to the repo can call the agent. It can never publish on its own.

**Cost:** the agent runs on Rafa's Claude plan (the token in the repo secret `CLAUDE_CODE_OAUTH_TOKEN`), so it uses that plan's limits, not extra money. GitHub Actions minutes are free for public repos.
