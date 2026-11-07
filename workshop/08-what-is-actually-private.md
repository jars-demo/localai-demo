# What is actually private

> Local AI means no AI company reads your chats. It does not mean your laptop is a vault. Check every claim yourself.

**Time:** 15 minutes

## Goal

Know exactly what Jan sends over the internet, where your chats sit, and how to check both on Windows and Mac.

## What leaves your laptop

| Thing | Goes online? | Your control |
| --- | --- | --- |
| Your chats with a downloaded model | **no** | nothing to do |
| First-time setup (engine, file-search model) | yes, once | needed |
| Downloading models from the Hub | yes, to huggingface.co | only when you click Download |
| Update check | **yes, on by default**, at startup and periodically | Settings → General → **Automatic Update Check** |
| Usage analytics (PostHog, EU) | only if you said yes | Settings → Privacy → **Analytics** |
| Web search | yes, if you turn it on | keep it off |
| Cloud models (OpenAI, Anthropic and others) | yes, your messages go to them | never add an API key under Settings → Model Providers |

Sources: [Jan's privacy page](https://docs.jan.ai/desktop/privacy), and Jan v0.8.8's code: [update endpoints](https://github.com/janhq/jan/blob/v0.8.8/src-tauri/tauri.conf.json), [analytics off by default](https://github.com/janhq/jan/blob/v0.8.8/web-app/src/hooks/useAnalytic.ts), [update check on by default](https://github.com/janhq/jan/blob/v0.8.8/web-app/src/hooks/useGeneralSetting.ts). Jan is open source, which is why these could be checked.

Should you turn update checks off? We suggest **no**. Updates fix security problems, and Jan v0.8.8 itself is a security update. Private and outdated are not the same thing.

Jan's legal privacy policy says it is used "100% offline". Its own docs and code show the update check and opt-in analytics. Trust the code.

## Where your chats are

Your chats are in the `threads` folder inside the data folder you chose in chapter 03 or 04:

- **Windows (this workshop):** `X:\Jan\threads`
- **Windows default:** `%APPDATA%\Jan\data\threads`
- **Mac default:** `~/Library/Application Support/Jan/data/threads`

Each chat is a folder. `messages.jsonl` holds the messages, `thread.json` the title and settings. Open `messages.jsonl` in Notepad or TextEdit. That is your conversation, in plain text.

**Plain text means not encrypted.** Anyone or anything that can read your files can read your chats. So:

- Lock your laptop with a password or PIN, and do not share your user account.
- Turn on disk encryption: **Device encryption / BitLocker** on Windows (Settings → Privacy & security → Device encryption), **FileVault** on Mac (System Settings → Privacy & Security → FileVault). Encrypt your data drive or external SSD too, since that is where the data now lives.
- Delete chats you no longer need.

## Watch the network yourself

**Windows: Resource Monitor** (built in)

1. Press Win + R, type `resmon`, press Enter.
2. Open the **Network** tab and tick the Jan processes.
3. Chat for a minute with Wi-Fi on. Watch **Network Activity** and **TCP Connections**.
4. During chat you should see only local addresses like `127.0.0.1`. Anything else (GitHub, apps.jan.ai, Hugging Face) is the update check or a download. Write down what you see.

**Mac: Activity Monitor** (built in)

1. Open Activity Monitor → **Network** tab.
2. Find Jan. Watch **Sent Bytes** and **Rcvd Bytes** while you chat.
3. Chatting with a local model should barely move them.

## Blocking Jan from the internet (optional, advanced)

- **Windows:** Windows Defender Firewall with Advanced Security → **Outbound Rules → New Rule → Program** → choose `Jan.exe` (Task Manager → right-click Jan → Open file location) → **Block the connection**. You must turn the rule off to download models or updates. The engine may run as a separate process, so check Task Manager. ([Microsoft: firewall rules](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/rules))
- **Mac:** the built-in firewall only blocks **incoming** connections ([Apple](https://support.apple.com/guide/mac-help/block-connections-to-your-mac-with-a-firewall-mh34041/mac)). To block outgoing ones you need a separate tool, such as the free, open source [LuLu](https://objective-see.org/products/lulu.html).

## What you can honestly say

- "My chats with a local model are processed on my laptop, and it works with the internet off."
- "My chats are stored as files in a folder I chose."
- "Jan's analytics are off unless I agree, and it checks for updates unless I turn that off."

What you should not say: "100% private", "nothing ever leaves my computer", "my chats are secure".

## Check it works

You opened a `messages.jsonl` from your own data folder, and you know the state of the Analytics and Automatic Update Check settings.

## Exercise

Run the network check above with Wi-Fi on. Then turn Automatic Update Check off, restart Jan, and run it again. Did anything change?
