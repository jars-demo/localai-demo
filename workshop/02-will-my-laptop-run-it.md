# Will my laptop run it

> Two minutes of checking now saves an hour of confusion later. Find your processor, memory, disk and graphics, on Windows or Mac.

**Time:** 10 minutes

## Goal

Know whether your laptop can run Jan, how fast it will feel, and which drive you will keep Jan's data on.

## The minimum, from Jan's own docs

| | Windows | macOS |
| --- | --- | --- |
| System | Windows 10 or 11 | macOS 13.6 or newer |
| Processor | x64 with **AVX2** (Intel 4th gen Core from 2013 or newer, any AMD Ryzen), or ARM64 | **Apple Silicon** (M1, M2, M3, M4 and later). Intel Macs cannot run local models in Jan. |
| Memory | 8 GB minimum, 16 GB recommended | 8 GB works with small models |
| Free disk | 10 GB | 10 GB |
| Graphics | optional, NVIDIA makes it much faster | built in, used automatically |

Sources: [Jan on Windows](https://docs.jan.ai/desktop/install/windows), [Jan on Mac](https://docs.jan.ai/desktop/install/mac).

## Check on Windows

1. **Processor and memory:** Settings → System → About. Read "Processor" and "Installed RAM".
2. **Graphics:** press Ctrl + Shift + Esc to open Task Manager → Performance. Look for "GPU". An NVIDIA card shows "Dedicated GPU memory" (that is VRAM).
3. **Drives:** open File Explorer → This PC. Note whether you have any drive other than C: (it might be D:, E:, F: or another letter) and how much space it has free.

Very old or budget Celeron and Pentium chips may not have AVX2. If unsure, search your exact processor name on [Intel's product site](https://www.intel.com/content/www/us/en/ark.html) and look for AVX2 under "Instruction Set Extensions". Without AVX2, Jan's engine will not start, and there is no workaround inside the app.

## Check on Mac

1. Apple menu  → **About This Mac**. Read "Chip" and "Memory".
   - Chip says **Apple M-something**: you are good.
   - Chip says **Intel**: Jan cannot run local models on this Mac. LM Studio needs Apple Silicon too.
2. Same window, read the **macOS** version. You need 13.6 or newer.
3. **Storage:** System Settings → General → Storage.

## Which drive will hold your data

Jan saves chats and models inside your user folder on the system drive by default. In this workshop we move them to a separate drive straight after setup. Reasons:

- **Resets and reinstalls.** If Windows is reset or reinstalled, the C: drive is usually wiped. A second drive usually survives.
- **Space.** Models are big. The system drive fills up first, and Windows gets slow when it is full.
- **You know where it is.** One folder you chose, easy to back up, easy to delete.

Your options:

In this workshop the letter **X stands for your data drive**. Wherever a path starts with X:, read your own letter: D:, E:, F: or whatever you have. On the website, pick your drive once and every path fills in for you.

| Your laptop | What to do |
| --- | --- |
| Windows with a second drive (D:, E:, F: or any letter) | use a folder called `Jan` on it, like `X:\Jan`. |
| Windows with only C: | keep the default, or use an external SSD. Do not partition your disk just for this workshop. |
| Mac (one internal drive, most Macs) | keep the default, or use an external SSD that is always plugged in when you use Jan. |

An external drive works, but Jan cannot open your chats or models while it is unplugged, and a slow USB stick makes models load slowly.

## What speed to expect

These are expectations, not measurements. Measure your own in chapter 06.

| Laptop | Feels like |
| --- | --- |
| 8 GB, no graphics card | works, answers word by word, be patient |
| 16 GB, no graphics card | usable for daily chat |
| NVIDIA card, 6 GB or more | fast |
| Apple Silicon Mac | usually comfortable with the small model |

Plug in your charger. Laptops on battery slow down a lot.

## Check it works

You can fill in this line: "My laptop has ___ GB memory, a ___ processor, ___ graphics, and I will keep Jan's data on ___."

## Exercise

Look at the free space on your chosen drive. You need at least 10 GB. If you are short, empty the Downloads folder or the Recycle Bin (Trash on Mac) now, before the downloads start.
