# Privacy & Security Investigation (Stage 2)

Research date: 2026-11-07. App: **Jan v0.8.8**. Where the docs were silent, I checked **the source code at the `v0.8.8` tag** (Jan is open source, which is exactly why we could do this).

Legend: **FACT** (with source) · **ASSUMPTION** · **UNVERIFIED** (test it yourself).

---

## Five terms, explained simply (use these in the video)

| Term | Plain-English meaning | Does Jan + a local model do it? |
|---|---|---|
| **Local inference** | The AI "thinking" happens on *your* laptop's chip, not on someone's server. | Yes |
| **Offline operation** | The app keeps working with Wi-Fi off. | Yes for chatting, **after** setup and model download |
| **Local storage** | Your chats are saved as files on your disk. | Yes, `%APPDATA%\Jan\data\threads` |
| **Telemetry** | The app phones home with usage statistics. | Only if you opt in. Off by default. |
| **Cloud inference** | Your message is sent to a company's server (OpenAI, Anthropic…) to get an answer. | Only if you add a cloud provider API key |

**Key point:** these are *separate things*. An app can do local inference and still send telemetry, or check for updates, or store chats unencrypted where any other program on your PC can read them.

---

## The 10 questions

### 1. Where are conversations stored?
**FACT:** `C:\Users\<you>\AppData\Roaming\Jan\data\threads\<thread-id>\`, containing `thread.json` (metadata) and `messages.jsonl` (the messages, in plain JSON lines).
Source: https://docs.jan.ai/desktop/data-folder
**ASSUMPTION** from the format: these are **not encrypted**. Anyone or anything with access to your Windows user account can read them, including malware, a family member on the same account, or your cloud backup tool if it backs up AppData.

### 2. Where are downloaded models stored?
**FACT:** `%APPDATA%\Jan\data\llamacpp\models\<org>\<repo>\`. Source: https://docs.jan.ai/desktop/data-folder
The location can be changed in **Settings > General > Jan Data Folder**.

### 3. Are prompts transmitted to external servers?
- **With a local model: no.** FACT (vendor claim): *"Local models keep everything at home"*, and analytics *"never peek at your chats"* (https://docs.jan.ai/desktop/privacy). Supported by the code: the PostHog analytics config sets `autocapture: false`, `disable_session_recording: true` and strips URL/path properties (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/providers/AnalyticProvider.tsx). The beginner-level proof is the Wi-Fi-off demo.
- **With a cloud model: yes**, to that provider. FACT: *"Cloud models (like GPT, Claude) need to see your messages to work."* (https://docs.jan.ai/desktop/privacy)
- **With Web Search turned on:** your search query goes to the search service. FACT that Web Search is an online feature: https://docs.jan.ai/desktop/web-search. The exact provider and data flow are **UNVERIFIED**, so keep it off for the demo.
- **With files attached and a local model:** *"All files are processed locally on your machine."* FACT (vendor claim): https://docs.jan.ai/desktop/file-upload

### 4. Does the application collect telemetry?
**FACT: Opt-in only, off by default.**
- Default: `productAnalytic: false` (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/hooks/useAnalytic.ts)
- A first-launch consent step called **"Help improve Jan"** has a **"Skip for now"** option (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/locales/en/setup.json) and **Allow** / **Deny** buttons (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/locales/en/common.json). FACT: the Windows recording showed **Deny**, so the chapters say Deny.
- Provider: PostHog, EU-hosted. If you opt in, it collects active users and retention, tied to a random ID (https://docs.jan.ai/desktop/privacy)
- Change it any time: **Settings > Privacy → Analytics / "Help us improve"** (strings: https://github.com/janhq/jan/blob/v0.8.8/web-app/src/locales/en/settings.json)

**Documentation inconsistency to be aware of:** Jan's legal privacy policy (https://jan.ai/privacy) says Jan is *"used 100% offline"* and doesn't mention analytics or update checks. The docs and code show opt-in analytics plus a default-on update check. **Don't quote "100% offline" in the video.**

### 5. Does it make update checks?
**FACT: Yes, on by default.**
- Endpoints: `https://apps.jan.ai/update-check` and `https://github.com/janhq/jan/releases/latest/download/latest.json` (https://github.com/janhq/jan/blob/v0.8.8/src-tauri/tauri.conf.json)
- Default `autoUpdateCheck: true` (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/hooks/useGeneralSetting.ts)
- Description: *"Automatically check for updates on startup and periodically."*
- Turn it off: **Settings > General > Automatic Update Check** (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/routes/settings/general.tsx)
- What an update check reveals: at minimum your **IP address** and that you run Jan (any HTTPS request does). That it sends the app version/platform is an **ASSUMPTION**, based on how the Tauri updater normally works.
- Recommendation: **leave updates ON** for normal users. v0.8.8 itself is a security update. Turning it off trades a tiny privacy gain for missing security fixes. Show viewers where the toggle is and let them decide.

### 6. Are there optional cloud services?
**FACT:** Yes:
- **Cloud model providers** (OpenAI, Anthropic, Gemini and more) via **Settings > Model Providers** with your API key (https://docs.jan.ai/desktop/quickstart)
- **Web Search** (https://docs.jan.ai/desktop/web-search)
- **MCP servers**, some of which are online, e.g. Exa (https://docs.jan.ai/desktop/quickstart)
- **Hugging Face** for model downloads (`huggingface.co`)

**How to avoid them:** don't enter any API key, keep Web Search off, and only pick models that show a download size (local ones). In the chat's model picker, check the model is a local llama.cpp model and not a cloud provider (exact UI label **UNVERIFIED**; check on screen).

### 7. Can it be used with Wi-Fi disabled?
**Yes, for chatting with a model you've already downloaded.** That's the point of local inference, and the demo will show it.
**No** for: first-run setup (it downloads the engine + embedding model, FACT: setup.json), downloading new models, Web Search, cloud models, and update checks.

### 8. What happens when internet access is restored?
- The update check runs again on startup or periodically, if enabled. FACT (setting description).
- Analytics resume only if you opted in. FACT (code).
- Your offline chats are **not uploaded anywhere**. There's no chat sync feature in Jan Desktop (ASSUMPTION, since no sync is documented; the network test below confirms it).

### 9. Can Windows Firewall restrict outbound connections?
**Yes.** Windows Defender Firewall supports outbound **Program** rules (https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/rules).
- Block Jan's internet access: **Windows Defender Firewall with Advanced Security → Outbound Rules → New Rule → Program →** `C:\Users\<you>\AppData\Local\Programs\Jan\Jan.exe` **→ Block the connection**. The install path is an ASSUMPTION inferred from the troubleshooting docs; confirm it via Task Manager → right-click Jan → Open file location.
- **Side effects:** no model downloads, no update checks, no cloud providers. Jan talks to its own engine over `127.0.0.1` (localhost). Whether a program-level block affects that local connection is **UNVERIFIED**; test it before recommending.
- The inference engine is downloaded into the data folder and may run as a **separate process**. ASSUMPTION, so check Task Manager for a child process (e.g. `llama-server`). A firewall rule on `Jan.exe` alone may not cover it.
- **Recommendation for beginners:** show Wi-Fi off / Airplane mode in the main video. Put the firewall rule in the written guide as an "advanced, optional" step.

### 10. How can a beginner verify it's running locally?
Three tests, from easiest to most rigorous:
1. **Airplane-mode test:** turn on Airplane mode, then chat. If you get answers, the AI runs on your laptop. (It proves *inference* is local, not that nothing is ever sent.)
2. **Task Manager test:** while the AI is answering, Task Manager → Performance shows CPU/GPU spiking. Your laptop is doing the work.
3. **Resource Monitor test** (no install needed): Win+R → `resmon` → **Network** tab → tick Jan's processes → watch **Network Activity** and **TCP Connections** while you chat, with Wi-Fi ON. You should see only local `127.0.0.1` traffic during chat. Any external address that appears (expected: the update check, GitHub, Hugging Face) is something to explain, not hide.
   - Advanced alternative: Microsoft Sysinternals **TCPView** (https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview).
   - **UNVERIFIED:** the exact set of external hosts Jan v0.8.8 contacts at startup. The app's security policy (CSP) also allows `fonts.gstatic.com` for fonts, and whether that's actually requested is unknown (tauri.conf.json). **Run this test before recording and report exactly what you see.**

---

## Practical privacy demonstration (for the video)

1. With internet ON: install Jan, complete setup, choose **Deny** on analytics, move the data folder to `X:\Jan` (Settings → General → App Data → Change Location), then download Qwen3.5-2B (Q4_K_M) and set Reasoning to Off.
2. Open **Settings > General**, show **Automatic Update Check**, and explain it.
3. **Turn on Airplane mode** (Action Center → Airplane mode, which also kills Ethernet if you use a dongle; or unplug the cable). Show the Wi-Fi icon disconnected.
4. Optional extra proof: open a browser tab and show it failing to load.
5. In Jan: **New chat** → ask 2–3 questions → answers arrive.
6. **Close Jan completely** (also from the system tray if present, since Jan is single-instance per the docs), then reopen it. The old chat is still in the sidebar → send another message → it works.
7. Open File Explorer → `X:\Jan\threads` (the data folder was moved off C: in step 1) → open a `messages.jsonl` in Notepad → "this is your chat, sitting on your disk, in plain text."
8. Turn Airplane mode off. (Optional: show `resmon` network activity for 20 seconds.)

## What we can and cannot claim on camera

**Can claim (evidence-backed):**
- "With a local model, your conversation is processed on your laptop. It works with the internet off; you just saw it."
- "Your chats are stored on your disk, here, as plain files."
- "Jan's analytics are off unless you say yes, and you can check their code because it's open source."
- "Jan checks for updates by default, and you can switch that off."

**Must NOT claim:**
- ~~"100% private"~~ / ~~"nothing ever leaves your computer"~~. Update checks and downloads do go online.
- ~~"Your chats are secure"~~. They're unencrypted files; your laptop's security is now your chat's security.
- ~~"No one can ever see your data"~~. Windows backups, OneDrive (if it syncs AppData; ASSUMPTION, it normally doesn't by default), malware or shared accounts all could.

**Honest framing sentence:** "Local AI means the AI company isn't reading your chats, because there *is* no AI company in the loop. It doesn't mean your laptop is a vault."
