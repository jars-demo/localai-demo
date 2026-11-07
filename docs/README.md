# Docs

The research behind the workshop at [localai.jishanahmed.in](https://localai.jishanahmed.in). The chapters in [../workshop](../workshop) are what learners read; this folder is for the person running the workshop.

## Research

| File | What is inside |
| --- | --- |
| [research/jan-ai-research.md](research/jan-ai-research.md) | install, requirements, first-run setup, Hub, GPU and CPU, offline, storage, files, API |
| [research/lm-studio-comparison.md](research/lm-studio-comparison.md) | Jan and LM Studio for beginners, and the verdict |
| [research/model-recommendations.md](research/model-recommendations.md) | the demo model, the upgrades, exact files, sizes, licences |
| [research/privacy-and-security.md](research/privacy-and-security.md) | ten privacy questions answered from docs and source code; what we may claim |
| [research/hardware-compatibility.md](research/hardware-compatibility.md) | AVX2, memory, graphics, what to expect |

## Screenshots

| File | What is inside |
| --- | --- |
| [shots/README.md](shots/README.md) | the screenshot file names the chapters expect |

## What was decided

- **App:** Jan v0.8.8 (2026-10-28), open source. LM Studio is the alternative in chapter 10.
- **One demo model:** Qwen3.5-2B, Q4_K_M, 1.28 GB, with Reasoning set to Off. Bigger models are upgrades only.
- **Data off the system drive:** Settings → General → App Data → Change Location → a folder like `X:\Jan` on any non-system drive (D:, E:, F:), right after setup and before the first download. Jan copies the data and restarts; it refuses drive roots and system folders. Single-drive laptops and most Macs keep the default or use an external SSD.
- **Honesty:** chat with a local model stays on the laptop and works offline. First-run setup and model downloads need the internet. The update check is on by default. Analytics are opt-in. Chats are plain-text files. Jan's legal policy says "100% offline"; its docs and code disagree, so we never repeat that line.

## Still to verify

1. Which model Jan's setup screen recommends (it is fetched online at runtime).
2. Whether Windows SmartScreen or macOS Gatekeeper warns on the installer.
3. Where the **Reasoning** control sits in the chat screen, and that Off removes the thinking text.
4. The exact label of the import option for a `.gguf` from a pen drive (chapter 05).
5. A Resource Monitor dry run: every external host Jan contacts at startup and during chat. Update `research/privacy-and-security.md` question 10.
6. Whether chat still works with `Jan.exe` blocked outbound in Windows Firewall, and whether the engine runs as a separate process.
7. Whether moving the data folder to an external SSD on a Mac (`/Volumes/...`) is accepted.
8. Your system RAM, for the description and pinned comment.
