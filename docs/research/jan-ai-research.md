# Jan AI: Research Notes (Stage 1)

Research date: 2026-11-07. Version researched: **Jan v0.8.8** (released 2026-10-28).

Legend: **FACT** = verified in an official source (URL given). **ASSUMPTION** = reasonable inference, not stated by a source. **UNVERIFIED** = could not confirm; check on your machine while recording.

---

## 1. What Jan is

| Item | Finding | Status | Source |
|---|---|---|---|
| Developer | Menlo Research | FACT | https://github.com/janhq/jan/blob/v0.8.8/LICENSE |
| Licence | Apache License 2.0 (open source) | FACT | https://github.com/janhq/jan/blob/v0.8.8/LICENSE |
| Latest version | v0.8.8, 2026-10-28 (security update; bundles llama.cpp engine 0.7.0) | FACT | https://github.com/janhq/jan/releases/tag/v0.8.8 |
| Windows installer file | `Jan_0.8.8_x64-setup.exe` (also `Jan_0.8.8_arm64-setup.exe` for Windows on ARM) | FACT | https://github.com/janhq/jan/releases/tag/v0.8.8 |
| Inference engine | llama.cpp (GGUF models). MLX only on Apple Silicon. | FACT | https://docs.jan.ai/desktop/manage-models |

## 2. Windows system requirements (official)

Quoted from https://docs.jan.ai/desktop/install/windows:

- **OS:** Windows 10 or higher
- **CPU:** x64 with **AVX2** support (Intel Haswell / 2013+, AMD Excavator / 2015+). ARM64 also supported.
- **RAM:** 8 GB minimum (16 GB recommended)
- **GPU:** "6GB VRAM minimum for NVIDIA, AMD, or Intel Arc GPUs", this is for *GPU acceleration*. A GPU is not required; Jan runs on CPU.
- **Disk:** 10 GB free minimum

**Important:** The troubleshooting page says there is **no "noavx" build**. If the CPU lacks AVX2, the bundled engine won't run, and the only options are a remote provider or a custom endpoint. Source: https://docs.jan.ai/desktop/troubleshooting
→ The tutorial needs a quick "is my CPU too old?" check (any Intel Core 4th gen / AMD Ryzen or newer is fine).

## 3. Installation process (Windows)

FACT (https://docs.jan.ai/desktop/install/windows):
1. Download the Windows x64 installer from https://jan.ai/ (or the GitHub releases page).
2. Run the downloaded `.exe`.
3. Wait for install to finish.
4. Launch Jan.

- Install location: `C:\Users\<you>\AppData\Local\Programs\Jan\`, **ASSUMPTION** based on the path shown in the troubleshooting page (`...\AppData\Local\Programs\Jan\resources\bin`).
- The Windows updater runs in `"installMode": "passive"`. FACT: https://github.com/janhq/jan/blob/v0.8.8/src-tauri/tauri.conf.json
- Windows SmartScreen / antivirus warning on first run: **UNVERIFIED**. Record whatever appears.

## 4. First launch (setup screen): needs internet

FACT, from the app's own English strings (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/locales/en/setup.json):

- Title: **"Jan needs to set up on your system"**
- Body: *"This takes a few minutes: Jan downloads its inference engine and a small model for file search."*
- Button: **"Let's start"**
- Steps include **"Help improve Jan"** (the analytics consent screen), **"Setting up the local engine"**, and **"Your first model"**.
- Hardware badge: **"Will use your GPU"** or **"Will run on CPU"**.
- After setup: **"Engine ready"**, *"Jan will run local models with llama.cpp."*
- Model step: *"Download the recommended model to start chatting, or browse the Hub for another one."*

The recommended first model is **fetched online at runtime**, not hard-coded, so its name can change. Setup-screen quantisation preference: `q4_k_xl` (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/constants/models.ts). **UNVERIFIED** which model it recommends today; it's most likely Jan-v3.5-4B. Note what you see on screen.

**Tutorial impact:** First-run setup **must be done online**. You cannot install Jan and immediately go offline.

## 5. Model formats, discovery and download

FACT (https://docs.jan.ai/desktop/manage-models):
- Format on Windows: **GGUF** only.
- **Hub** tab (left sidebar): click a model, and Jan shows a fit pill, **Fits**, **May be slow** or **Won't fit**, for *your* hardware. Click **Download**. Progress shows in the top bar; **×** cancels; click **Download** again to retry.
- Quantisation choices are grouped **Small / Balanced / Large**, and the default one is tagged **Recommended**.
- You can paste a Hugging Face repo ID into the Hub search.
- On a Hugging Face model page, **Use this model → Jan** also works.
- Local GGUF files can be imported via the Llama.cpp engine settings.
- Some gated models need a Hugging Face token: **Settings > General > Others > HuggingFace Token**.
- Downloads come from `huggingface.co` (FACT: https://github.com/janhq/jan/blob/v0.8.8/web-app/src/services/models/default.ts).

## 6. GPU acceleration and CPU-only

FACT (https://docs.jan.ai/desktop/troubleshooting):
- Jan **bundles CUDA 13 runtime**, so you don't need to install the CUDA Toolkit. You only need a current NVIDIA driver.
- GPUs or drivers that can't run CUDA 13 use **Vulkan** instead (AMD, Intel, and older NVIDIA).
- Toggle and backend: **Settings > Hardware > GPUs** (switch on, choose CUDA or Vulkan).
- Fix for GTX 16xx / RTX 20xx "unsupported toolchain" errors: update to v0.8.6+.
- CPU-only works. It's slower.

Integrated graphics (Intel Iris Xe / AMD Radeon iGPU) via Vulkan: the docs mention Vulkan for AMD/Intel. **UNVERIFIED** whether this is actually faster than CPU on a given iGPU. Test, don't promise.

## 7. Offline functionality

| Feature | Works offline? | Status |
|---|---|---|
| Chatting with an already-downloaded local model | Yes | FACT (docs: "Local models keep everything at home"); verify in the video |
| First-run engine setup | No | FACT (setup.json) |
| Downloading models from the Hub | No (huggingface.co) | FACT |
| Browsing the Hub catalogue | Probably not | ASSUMPTION |
| Update check | No; it just fails silently or shows "Failed to check for updates" | FACT for the string; behaviour offline UNVERIFIED |
| Web Search feature | No (uses an online search service/MCP) | FACT that it's an online feature: https://docs.jan.ai/desktop/web-search |
| Cloud models (OpenAI, Anthropic, etc.) | No, and they send your messages to that provider | FACT: https://docs.jan.ai/desktop/privacy |

## 8. Chat history storage

FACT (https://docs.jan.ai/desktop/data-folder):
- Default data folder: `%APPDATA%\Jan\data` = `C:\Users\<you>\AppData\Roaming\Jan\data`
- `threads\`, one subfolder per chat. Inside: `thread.json` (title, model, timestamps) and `messages.jsonl` (one message per line).
- `llamacpp\models\<org>\<repo>\`, downloaded models
- `logs\app.log`, logs, kept 24 hours
- *"Jan stores your data locally in JSON format."*
- Change location: **Settings > General > App Data > Change Location** (the docs call it "Jan Data Folder"). FACT from the v0.8.8 source (https://github.com/janhq/jan/blob/v0.8.8/src-tauri/src/core/app/commands.rs): Jan **copies** the old folder into the new one, leaves the old copy in place, and restarts. It refuses drive roots, OS and program folders, and the home folder itself. The pointer lives in `%APPDATA%\Jan\settings.json` (`data_folder`), outside `data`, so deleting only the old `data` folder is safe. **Workshop rule:** move it to a non-system drive (e.g. `X:\Jan`) right after setup and before downloading any model. As of v0.8.8, a drive root like `D:\` is refused; use `X:\Jan`.

The files are **plain text, not encrypted**. ASSUMPTION based on the JSON/JSONL format: anyone with access to your Windows account can read your chats. This is worth saying on camera.

## 9. Documents / PDF

FACT (https://docs.jan.ai/desktop/file-upload):
- Chat attachments: the **+** button → **Add documents or files** (also images/audio if the model supports it).
- Projects: **Files** panel → **Add**. Supports PDF, Markdown, DOCX, XLSX, PPTX and code files.
- *"All files are processed locally on your machine"* with local models. With cloud providers, files are sent to that provider.
- The embedding model for file search is downloaded during first-run setup (setup.json: "Downloading the embedding model...").

**Recommendation:** Keep PDFs **out of the main video**, or show them as a 30-second bonus only. It adds failure points for beginners.

## 10. Local API server

FACT (https://docs.jan.ai/desktop/api-server, release notes):
- OpenAI-compatible server on `127.0.0.1:1337`.
- In v0.8.8, browser-origin requests are restricted to **Trusted Hosts**.
- Not needed for this tutorial. Mention it in one line for developers.

## 11. Telemetry, update checks and network connections

See `privacy-and-security.md` for the full analysis. Summary:

- **Analytics:** PostHog EU, **off by default** (`productAnalytic: false`), with a consent prompt on first launch. If enabled, it collects active users and retention tied to a random ID. FACT: https://github.com/janhq/jan/blob/v0.8.8/web-app/src/hooks/useAnalytic.ts and https://docs.jan.ai/desktop/privacy
- **Update check:** **on by default** (`autoUpdateCheck: true`). It calls `https://apps.jan.ai/update-check` and GitHub's `latest.json` on startup and periodically. Setting label: **"Automatic Update Check"**. FACT: tauri.conf.json, useGeneralSetting.ts, settings.json
- **Cloud integrations:** optional. Added via **Settings > Model Providers** with an API key. Avoid them by never entering an API key.

## 12. Things to verify manually while recording

1. Which model the setup screen recommends, and its size.
2. Exact location of the **Automatic Update Check** toggle (expected: Settings > General).
3. Whether SmartScreen warns on the installer.
4. Whether the Hub shows anything offline.
5. Network activity with Resource Monitor (see the privacy checklist).
