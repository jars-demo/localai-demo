# When it breaks

> The ten problems people actually hit, with the fix first and the explanation second. Windows and Mac.

**Time:** 10 minutes

## Goal

Fix the common problems yourself, and know what to share when you ask for help.

**Where is the log?** In Jan: **System Monitor** (bottom bar) → **App Log**. On disk: `logs/app.log` inside your data folder (`X:\Jan\logs\app.log` in this workshop). Logs are kept for 24 hours. Remove personal details before sharing.

## 1. It will not install

- Windows: x64 file for Intel and AMD, ARM64 only for Snapdragon. Mac: Apple Silicon only.
- Download again from jan.ai. A half-finished download will not install.
- "Windows protected your PC": **More info → Run anyway**. Mac: **System Settings → Privacy & Security → Open Anyway**. Only for files from jan.ai.
- Free some disk space (10 GB).

## 2. The data folder will not move

- "Cannot relocate data folder to root directory": pick `X:\Jan`, not `X:\`.
- System folders and your user folder itself are refused too.
- Windows fallback: quit Jan, edit `%APPDATA%\Jan\settings.json`, set `"data_folder": "X:\\Jan"`, reopen.

## 3. The model download fails

- Check the internet. Click **Download** again.
- College or office Wi-Fi may block huggingface.co. Try a phone hotspot (watch your data, it is 1.3 GB).
- Or import the file from a pen drive (chapter 05).

## 4. The model will not load

- `failed to load model` or `missing tensor`: delete the model and download it again.
- `unknown model architecture`: update Jan (Settings → General → **Check for Updates**).
- Load timed out: a slow external drive or USB stick. Move the data folder to an internal drive or a faster SSD.

## 5. Out of memory

`out of memory`, `failed to allocate`, `cudaMalloc`, or `ggml_metal` on Mac:

1. Close other apps, especially browsers and games.
2. Lower **Context Size** in the model settings (the default is 8192, try 4096).
3. Windows with a GPU: turn GPU offload down or off in **Settings → Hardware → GPUs**.

Jan's rule of thumb: keep the model under 80% of your free memory.

## 6. It is slow

- Plug in the charger. On Windows set power mode to **Best performance**.
- Set **Reasoning** to **Off** (chapter 06).
- Start a new chat. Long chats get slower.
- 8 GB and no graphics card: a few words per second is normal.

## 7. The NVIDIA GPU is not used (Windows)

1. Device Manager → Display adapters: the NVIDIA card is listed.
2. Update the NVIDIA driver. You do not need the CUDA Toolkit, Jan includes what it needs.
3. **Settings → Hardware → GPUs**: switch the GPU on, choose **CUDA** (or **Vulkan**).
4. Restart Jan and load the model again.

AMD or Intel graphics use **Vulkan**. Update the graphics driver first.

## 8. Jan crashes or will not open

- Jan runs only once. Quit any leftover copy (system tray on Windows, Cmd + Q on Mac, or Task Manager / Activity Monitor).
- External data drive? Plug it in before opening Jan.
- Corrupt settings: quit Jan, rename `store.json` in the data folder to `store.json.old`. Jan rebuilds it. Chats and models are kept.

## 9. No internet and no model yet

You need the internet once, for setup and the model. Use a hotspot or a friend's Wi-Fi once, or import the `.gguf` from a pen drive. After that, everything in chapter 07 works offline.

## 10. My chats disappeared

- **Settings → General → App Data**: where is Jan looking? Your chats are in `threads` there.
- Unplugged external drive? Plug it in and restart Jan.
- Moved the folder but deleted `settings.json` by mistake? Jan went back to the default. Point **Change Location** at `X:\Jan` again.
- **Reset To Factory Settings** deletes chats. Back up the `threads` folder now and then.

## Asking for help

Share: laptop model, Windows or macOS version, memory, graphics, model name, and the exact error line from the log. "Not working bro" cannot be debugged.

## Check it works

You can find your log file and your data folder without searching.

## Exercise

Open the App Log, start a chat, and find the line where the model loads. Note how long it took.

Source: [Jan troubleshooting](https://docs.jan.ai/desktop/troubleshooting).
