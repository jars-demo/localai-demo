# Install Jan on Windows

> Download Jan, let it set itself up, say no to analytics if you like, and move its data off the C: drive before anything big lands there.

**Time:** 15 minutes

## Goal

Jan installed, its engine ready, and its data folder at `X:\Jan`, where `X:` is the drive you picked in chapter 02 (D:, E:, F: or any drive that is not C:). On a Mac, go to chapter 04 instead.

Keep the internet **on** for this whole chapter.

## 1. Download

1. Open [jan.ai](https://jan.ai/) and click **Download** for Windows.
2. Pick **x64** for normal Intel and AMD laptops. Pick **ARM64** only for Snapdragon laptops.
3. The file is called something like `Jan_0.8.8_x64-setup.exe`.

Only download from jan.ai or [Jan's GitHub releases](https://github.com/janhq/jan/releases). Not from "free download" sites.

## 2. Install

1. Double-click the `.exe`.
2. If Windows shows **"Windows protected your PC"**, check the file came from jan.ai, then click **More info → Run anyway**.
3. Wait. Jan opens by itself when it is done.

The app itself installs into your user folder on C:. The installer does not ask where. That is a few hundred MB at most. Your chats and models are the big part, and we move those in step 4.

## 3. First-time setup

Jan shows **"Jan needs to set up on your system"**. Click **Let's start**.

1. **Help improve Jan.** This asks whether to share anonymous usage statistics (not your chats). Analytics are off by default. Click **Deny** to keep them off.
2. **Setting up the local engine.** Jan downloads the engine that runs models, plus a small model for file search. This needs internet and takes a few minutes.
3. A badge shows **"Will use your GPU"** or **"Will run on CPU"**. Both are fine.
4. Wait for **"Engine ready"**.
5. If it offers to download a first model, **do not download yet**. Move the data folder first.

## 4. Move the data folder off C:

By default Jan keeps everything in `C:\Users\<you>\AppData\Roaming\Jan\data`. Move it now, while it is still small.

1. Create the folder first: open File Explorer, go to your data drive (`X:`), and make a new folder called `Jan`.
2. In Jan, open **Settings → General**. Find **App Data** ("Location for messages, downloaded models and other data").
3. Click **Change Location** and choose `X:\Jan`.
4. Confirm. Jan stops, **copies** the current data into `X:\Jan`, and restarts.
5. Jan may show its setup screen again after the restart. That is normal. Go through it once more, and click **Deny** again on "Help improve Jan".

Rules Jan enforces:

- Not a drive root. `X:\` is refused. Use a folder like `X:\Jan`.
- Not a Windows or Program Files folder, and not your user folder itself.

## 5. Clean up the old copy (optional)

Jan copies, it does not move, so the old data is still on C:. Once everything under "Check it works" below is true:

1. Close Jan fully (also from the system tray, the ^ near the clock).
2. Open `%APPDATA%\Jan` in File Explorer.
3. Delete **only the `data` folder** inside it.

Do **not** delete the whole `Jan` folder. The file `settings.json` next to `data` is what tells Jan to look in `X:\Jan`. Delete it and Jan goes back to C:.

## Check it works

- **Settings → General → App Data** shows `X:\Jan`.
- `X:\Jan` in File Explorer contains folders such as `threads`, `extensions` and `logs`.

## Exercise

Click **Open Containing Folder** next to App Data in Jan's settings. Which folder opens? It should be `X:\Jan`. Every chat you have from now on is saved in its `threads` folder.

## If something goes wrong

- **"Cannot relocate data folder to root directory"**: you picked `X:\`. Pick `X:\Jan`.
- **Relocation fails**: fully quit Jan, open `%APPDATA%\Jan\settings.json` in Notepad, and set `"data_folder": "X:\\Jan"` (two backslashes). Save and reopen Jan. This is from [Jan's troubleshooting guide](https://docs.jan.ai/desktop/troubleshooting).
- **Setup stuck on the engine download**: check your internet, then click **Re-run checks**.

Sources: [Install on Windows](https://docs.jan.ai/desktop/install/windows), [Data folder](https://docs.jan.ai/desktop/data-folder), Jan v0.8.8 source ([relocation code](https://github.com/janhq/jan/blob/v0.8.8/src-tauri/src/core/app/commands.rs)).
