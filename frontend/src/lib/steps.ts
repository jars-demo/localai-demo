// The follow-along track: every step from chapters 02 to 08 in one list, for one setup.
// Text uses two marks: **bold** for what you click or read, `code` for paths and things to type.
// Every fact here comes from the chapters; change them together.

import { dataPath, inData, movesData, type Setup } from './setup'

export type Step = {
  id: string
  title: string
  chapter: string
  doThis: string[]
  see: string[]
  fix?: string[]
  note?: string
}

export function stepsFor(setup: Setup): Step[] {
  const win = setup.os === 'windows'
  const moving = movesData(setup)
  const data = dataPath(setup)
  const install = win ? '03-install-on-windows' : '04-install-on-mac'
  const steps: Step[] = []

  steps.push({
    id: 'check',
    title: 'Check your laptop',
    chapter: '02-will-my-laptop-run-it',
    doThis: win
      ? [
          'Open **Settings → System → About**. Read "Processor" and "Installed RAM". You need **8 GB** or more.',
          'Press **Ctrl + Shift + Esc** → **Performance**. An NVIDIA graphics card makes it faster, but it is optional.',
          'Open **File Explorer → This PC**. Find a drive that is not C: with **10 GB** free, and pick it above.',
        ]
      : [
          'Apple menu → **About This Mac**. "Chip" must say **Apple M1** or newer.',
          'Same window: macOS **13.6** or newer, and **8 GB** memory or more.',
          '**System Settings → General → Storage**: you need **10 GB** free. Low on space? Use an external SSD.',
        ],
    see: ['You know your memory, your chip, and where Jan’s data will live.'],
    fix: win
      ? [
          'Old Celeron or Pentium? The processor needs **AVX2** or Jan’s engine will not start. Chapter 02 shows how to check.',
        ]
      : ['Chip says **Intel**? Stop here. Jan cannot run local models on an Intel Mac.'],
  })

  if (moving) {
    steps.push({
      id: 'folder',
      title: 'Make a home for your AI',
      chapter: install,
      doThis: win
        ? [
            `Open **File Explorer** and go to your data drive.`,
            'Right-click → **New → Folder**. Name it `Jan`.',
            `That is \`${data}\`: a folder, never the drive itself.`,
          ]
        : [
            'Plug in the SSD and open it in **Finder**.',
            'Make a new folder called `Jan` (**Shift + Cmd + N**).',
            `Its path looks like \`${data}\`, with your SSD’s name in it.`,
          ],
      see: ['An empty `Jan` folder, off your system drive.'],
    })
  }

  steps.push({
    id: 'download',
    title: 'Download Jan',
    chapter: install,
    doThis: win
      ? [
          'Open `jan.ai` and click **Download** for Windows.',
          'Pick **x64** for normal Intel and AMD laptops. Pick **ARM64** only for Snapdragon.',
          'The file is called something like `Jan_0.8.8_x64-setup.exe`.',
        ]
      : [
          'Open `jan.ai` and click **Download** for macOS.',
          'The file is called something like `Jan_0.8.8_universal.dmg`.',
        ],
    see: ['The installer is in your Downloads folder.'],
    note: 'Only download from jan.ai or Jan’s GitHub releases. Never from “free download” sites.',
  })

  steps.push({
    id: 'install',
    title: 'Install it',
    chapter: install,
    doThis: win
      ? [
          'Double-click the `.exe`.',
          'Windows says **“Windows protected your PC”**? If the file came from jan.ai, click **More info → Run anyway**.',
          'Wait. Jan opens by itself.',
        ]
      : [
          'Double-click the `.dmg` and drag **Jan** into **Applications**.',
          'Open Jan from Applications.',
          'Blocked? **System Settings → Privacy & Security → Open Anyway**. Only for a file from jan.ai.',
        ],
    see: ['Jan’s window is open.'],
  })

  steps.push({
    id: 'setup',
    title: 'Let Jan set itself up',
    chapter: install,
    doThis: [
      'Keep the internet **on**. Click **Let’s start**.',
      '“Help improve Jan”: click **Skip for now** to keep analytics off.',
      `Jan downloads its engine. A badge says **“Will use your GPU”** or **“Will run on CPU”**. Both are fine.`,
      'Wait for **“Engine ready”**. If it offers a model, **do not download it yet**.',
    ],
    see: ['**Engine ready**.'],
    fix: ['Stuck on the engine download? Check the internet, then click **Re-run checks**.'],
  })

  if (moving) {
    steps.push({
      id: 'move',
      title: 'Move Jan’s data off the system drive',
      chapter: install,
      doThis: [
        'In Jan: **Settings → General**. Find **App Data**.',
        `Click **Change Location** and pick \`${data}\`.`,
        'Confirm. Jan **copies** everything there and restarts.',
      ],
      see: [
        `**App Data** shows \`${data}\`.`,
        `\`${data}\` now has folders like \`threads\`, \`extensions\` and \`logs\`.`,
      ],
      fix: win
        ? [
            '**“Cannot relocate data folder to root directory”**: you picked the drive itself. Pick the `Jan` folder inside it.',
            `Still failing? Quit Jan, open \`%APPDATA%\\Jan\\settings.json\` in Notepad, set \`"data_folder": "${data.replace(/\\/g, '\\\\')}"\`, save and reopen.`,
          ]
        : [
            'Refused? Pick the `Jan` folder inside the SSD, not the SSD itself.',
            'From now on, plug the SSD in **before** you open Jan.',
          ],
      note: 'Do this before any model download, while the data is still small. Jan copies, so an old copy stays behind; chapter 03 shows how to clean it up safely.',
    })
  } else {
    steps.push({
      id: 'move',
      title: 'Check where Jan keeps its data',
      chapter: install,
      doThis: [
        'In Jan: **Settings → General → App Data**. Leave it as it is.',
        win
          ? 'With only one drive, the default is the honest choice. Do not partition your disk for this.'
          : 'Most Macs have one internal drive, so the default is fine.',
      ],
      see: [`**App Data** shows \`${data}\`.`],
    })
  }

  steps.push({
    id: 'model',
    title: 'Download your first model',
    chapter: '05-your-first-model',
    doThis: [
      'Open **Hub** in the left sidebar. Setup suggested another model? Choose **Browse other models in the Hub**.',
      'Search `Qwen3.5-2B`. Your laptop’s label should say **Fits**.',
      'Choose **Q4_K_M** (1.28 GB) and click **Download**. This part uses the internet: the file comes from huggingface.co.',
    ],
    see: [
      'Qwen3.5-2B appears in the model picker of a new chat.',
      `The \`.gguf\` file, about 1.3 GB, is in \`${inData(setup, 'llamacpp', 'models')}\`.`,
      ...(win && moving ? ['Your C: drive did **not** grow by 1.3 GB.'] : []),
    ],
    fix: [
      '**Won’t fit** for a 1.28 GB model? Close other apps and check your memory again.',
      'Download failed? Click **Download** again.',
    ],
  })

  steps.push({
    id: 'chat',
    title: 'First chat, with Reasoning off',
    chapter: '06-first-chat-and-scenarios',
    doThis: [
      'Click **New Chat** and pick **Qwen3.5-2B**.',
      'Set **Reasoning** to **Off**. Qwen3.5 thinks out loud by default, which is slow for chat.',
      'Ask: `Explain what a CPU does, like I am 12.`',
      win
        ? 'While it answers, open **Task Manager → Performance**. CPU or GPU jumps, and memory goes up: the model now sits in your RAM.'
        : 'While it answers, open **Activity Monitor**. CPU and memory go up: the model now sits in your memory.',
    ],
    see: ['The answer appears word by word. The first one is slower while the model loads.'],
    fix: ['Very slow? Plug in the charger, close other apps, and check Reasoning is **Off**.'],
  })

  steps.push({
    id: 'offline',
    title: 'Pull the plug',
    chapter: '07-pull-the-plug',
    doThis: [
      win
        ? 'Taskbar network icon → turn on **Airplane mode**. Unplug any cable.'
        : 'Control Centre → turn **Wi-Fi** off. Unplug any cable.',
      'Load any website in your browser. It should fail.',
      'In Jan, start a **New Chat** and ask: `Explain compound interest with an example in rupees.`',
      win
        ? 'Quit Jan fully (also from the tray, the ^ near the clock), open it again, and chat once more.'
        : 'Quit Jan with **Cmd + Q**, open it again, and chat once more.',
    ],
    see: ['It answers with the internet off, and your chats survived a restart.'],
    note: 'This proves the AI runs on your laptop. It does not prove Jan never goes online: setup, downloads and the update check do.',
  })

  steps.push({
    id: 'files',
    title: 'Find your chats on disk',
    chapter: '08-what-is-actually-private',
    doThis: [
      `Open \`${inData(setup, 'threads')}\` in ${win ? '**File Explorer**' : '**Finder** (Shift + Cmd + G)'}.`,
      `Open any chat folder, then open \`messages.jsonl\` in ${win ? 'Notepad' : 'TextEdit'}.`,
    ],
    see: ['Your conversation, in plain text, on your own disk.'],
    note: `Plain text means not encrypted. Lock your laptop, and turn on ${
      win ? 'Device encryption or BitLocker' : 'FileVault'
    }${moving ? ', for the data drive too' : ''}.`,
  })

  steps.push({
    id: 'privacy',
    title: 'Check the privacy switches',
    chapter: '08-what-is-actually-private',
    doThis: [
      '**Settings → Privacy → Analytics**: off, unless you chose to help.',
      '**Settings → General → Automatic Update Check**: we suggest leaving it on. Updates fix security problems.',
      'To keep chats local, never add a cloud API key under **Settings → Model Providers**.',
      'Turn the internet back on.',
    ],
    see: [
      'You know when Jan goes online: setup, model downloads, the update check, and analytics only if you said yes.',
    ],
  })

  return steps
}
