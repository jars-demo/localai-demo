# Your own private ChatGPT

A hands-on, no-code workshop: run a ChatGPT-style AI on your own laptop with Jan, keep its chats and models on a drive you chose, switch the internet off and keep chatting, then check for yourself what is private and what is not. Windows and macOS.

**Workshop site:** [localai.jishanahmed.in](https://localai.jishanahmed.in)

No subscription, no API key, no account. One small model, **Qwen3.5-2B** (1.28 GB), so every laptop in the room can follow along.

## Quick start

You need a laptop from the last ten years with 8 GB of memory, 10 GB of free disk, and internet for the first half hour.

1. Check your laptop: [02. Will my laptop run it](workshop/02-will-my-laptop-run-it.md)
2. Install Jan on [Windows](workshop/03-install-on-windows.md) or [Mac](workshop/04-install-on-mac.md), and move its data off the system drive
3. Download [your first model](workshop/05-your-first-model.md), then [pull the plug](workshop/07-pull-the-plug.md)

Or do it all on one page: [Follow along](https://localai.jishanahmed.in/follow-along) picks your system and drive, fills in every path, and ticks off each step.

## The workshop

| #   | Chapter                                                                  | You learn                                                       |
| --- | ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| 01  | [What local AI is](workshop/01-what-local-ai-is.md)                      | cloud vs local, and five words people mix up                    |
| 02  | [Will my laptop run it](workshop/02-will-my-laptop-run-it.md)            | processor, memory, graphics and which drive holds your data     |
| 03  | [Install Jan on Windows](workshop/03-install-on-windows.md)              | install, first-time setup, moving data off C: (`X:\Jan`)           |
| 04  | [Install Jan on Mac](workshop/04-install-on-mac.md)                      | install on Apple Silicon, where the data lives                  |
| 05  | [Your first model](workshop/05-your-first-model.md)                      | what a model is, Q4_K_M, the fit labels                         |
| 06  | [First chat and real scenarios](workshop/06-first-chat-and-scenarios.md) | Reasoning off, everyday prompts, where small models fail        |
| 07  | [Pull the plug](workshop/07-pull-the-plug.md)                            | chat with the internet off, restart, still works                |
| 08  | [What is actually private](workshop/08-what-is-actually-private.md)      | update checks, analytics, plain-text chats, watching the network |
| 09  | [When it breaks](workshop/09-when-it-breaks.md)                          | the ten problems people hit, fix first                          |
| 10  | [Jan or LM Studio, and what next](workshop/10-jan-vs-lm-studio.md)       | the alternative, upgrading the model, next steps                |

## The one rule

Jan keeps chats and models on the system drive by default. Every path in this workshop moves them to a folder on another drive (`X:\Jan` on Windows, where `X:` is any drive that is not C:, like D:, E: or F:) **right after setup and before the first model download**, so a Windows reset does not take them and the system drive does not fill up. Laptops with only one drive keep the default or use an external SSD. Chapter 02 explains the choice.

## Layout

```text
workshop/          the chapters, in Markdown (the source of truth)
docs/research/     the research behind every claim, with sources
docs/shots/        screenshots and short clips from the recording, used by the chapters
frontend/          the workshop site (Next.js, static, no backend), which renders workshop/
```

Every technical claim is checked against Jan v0.8.8 (released 2026-10-28): its docs, and where the docs were silent, its source code. Research notes mark anything not verified as UNVERIFIED.

## Run the site locally

```bash
cd frontend
npm ci
npm run dev
```

## License

[MIT](LICENSE)
