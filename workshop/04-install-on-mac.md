# Install Jan on Mac

> Drag Jan into Applications, let it set itself up, and decide where its data lives before the first model arrives.

**Time:** 15 minutes

## Goal

Jan installed on an Apple Silicon Mac, its engine ready, and a deliberate choice about where its data folder is. On Windows, go back to chapter 03.

Keep the internet **on** for this whole chapter. Intel Mac? Jan cannot run local models there (chapter 02).

## 1. Download

1. Open [jan.ai](https://jan.ai/) and click **Download** for macOS.
2. The file is called something like `Jan_0.8.8_universal.dmg`.

Only download from jan.ai or [Jan's GitHub releases](https://github.com/janhq/jan/releases).

## 2. Install

1. Double-click the `.dmg`.
2. Drag **Jan** into the **Applications** folder.
3. Open Jan from Applications (or press Cmd + Space and type "Jan").
4. If macOS says the app cannot be opened, go to **System Settings → Privacy & Security**, scroll down and click **Open Anyway**. Only do this for a file you downloaded from jan.ai.

## 3. First-time setup

Jan shows **"Jan needs to set up on your system"**. Click **Let's start**.

1. **Help improve Jan.** Anonymous usage statistics, off by default. Click **Skip for now** to keep them off.
2. **Setting up the local engine.** Jan downloads the engine and a small model for file search. On Apple Silicon it uses the Mac's graphics (Metal) automatically.
3. Wait for **"Engine ready"**.
4. If it offers a first model, **wait** until you have decided on the data folder.

## 4. Decide where the data lives

The default is `~/Library/Application Support/Jan/data` on your Mac's internal drive. Most Macs have only one internal drive, so you have two sensible choices:

| Choice | Do this | Good for |
| --- | --- | --- |
| **Keep the default** | nothing | most people |
| **External SSD** | create a folder like `Jan` on the SSD, then **Settings → General → App Data → Change Location** | low internal storage, or keeping AI data separate |

If you choose the external SSD:

1. Plug it in and create the folder in Finder, for example `/Volumes/MySSD/Jan`.
2. In Jan: **Settings → General → App Data → Change Location** → pick that folder → confirm.
3. Jan copies the data there and restarts.
4. From now on, plug the SSD in **before** opening Jan.

Jan refuses a drive's top level and system folders, so always pick a folder inside the drive.

## 5. Clean up the old copy (optional)

Jan copies, it does not move. After checking below, quit Jan (Cmd + Q). In Finder press Shift + Cmd + G, go to `~/Library/Application Support/Jan`, and move **only the `data` folder** to the Trash. Leave everything else; it holds the setting that points Jan to the new folder.

## Check it works

- **Settings → General → App Data** shows the folder you expect.
- Open it in Finder. You should see `threads`, `extensions` and `logs`.

## Exercise

Find your data folder without using Jan: in Finder press Shift + Cmd + G and type the path from App Data. Bookmark it in the Finder sidebar (drag it there). You will open it again in chapter 08.

## If something goes wrong

- **"Cannot relocate data folder to root directory"**: pick a folder inside the drive, not the drive itself.
- **Jan opens empty after unplugging the SSD**: quit, plug the SSD in, reopen.
- **A `ggml_metal` error later on**: the model is too big for your Mac's memory. Use the small model from chapter 05.

Sources: [Install on Mac](https://docs.jan.ai/desktop/install/mac), [Data folder](https://docs.jan.ai/desktop/data-folder), [Troubleshooting](https://docs.jan.ai/desktop/troubleshooting).
