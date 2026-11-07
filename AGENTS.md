# AGENTS.md

Guidance for AI coding agents and developers. Humans: start with [README.md](README.md).

## What this is

A no-code workshop, "Your own private ChatGPT": run a local model with Jan on Windows or macOS, keep its data off the system drive, chat offline, and check what is private. The chapters in `workshop/` are the product; `frontend/` is the site; `docs/` holds the research and the video package. There is no backend and no lab code.

## Map

```text
workshop/NN-slug.md      chapters: # Title, > summary, **Time:** N minutes, ## Goal ... ## Check it works, ## Exercise
docs/research/           facts with source URLs; FACT / ASSUMPTION / UNVERIFIED labels
docs/shots/              screenshots from the real recording; README.md lists the expected file names
frontend/                Next.js static site; reads ../workshop at build time
frontend/src/lib/        workshop.ts (chapter parser), picker.ts (laptop to model advice),
                         setup.ts (system + data drive, fills X: in paths), steps.ts (the follow-along track)
frontend/src/lib/video.ts  the YouTube id for the home page video; empty shows "Coming soon"
```

## Commands

```bash
cd frontend && npm ci && npm run verify
```

## Rules

1. **Data off the system drive.** Every install path moves Jan's data folder (Settings → General → App Data → Change Location) to a folder on a non-system drive on Windows, written `X:\Jan` in the chapters (D:, E:, F: or whatever the learner has; the site fills in the letter they pick), right after setup and before any model download. Single-drive machines get the honest alternative (keep the default, or an external SSD). A unit test checks chapters 03 and 04 for this.
2. **One demo model.** Qwen3.5-2B, Q4_K_M, 1.28 GB, Reasoning set to Off. Bigger models are upgrades in chapter 10 only.
3. **No overclaiming.** Never write "100% private", "nothing leaves your computer" or "secure". Jan checks for updates by default and chats are plain-text files. Say so.
4. **Claims need a source.** Requirements, sizes, settings labels and privacy behaviour come from Jan's docs, Jan's v0.8.8 source, LM Studio's docs or Hugging Face. If it cannot be verified, mark it UNVERIFIED in `docs/research/` and keep it out of the chapters.
5. **Windows and macOS both.** Any step that differs gives both. Intel Macs cannot run local models in Jan; say it.
6. **Credits.** Never put the co-creator's name, username or links anywhere public facing: the site, the chapters, the docs, or the video and its description. Where a credit is needed, write SAV.
7. **Writing style.** Plain English, short sentences, no em dashes. Conventional Commits, no AI attribution trailers.
