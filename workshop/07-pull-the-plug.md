# Pull the plug

> Switch the internet off, keep chatting, close the app, open it again, keep chatting. Proof that the AI lives on your laptop.

**Time:** 10 minutes

## Goal

Show yourself that chatting needs no internet once setup and the model download are done.

## Before you start

This only works **after** chapters 03 or 04 and 05. Jan's first-time setup and model downloads need the internet. If you install Jan and go straight into a forest, you get a very nice empty app.

## Switch the internet off

- **Windows:** click the network icon at the bottom right of the taskbar → turn on **Airplane mode**. Using a cable? Unplug it too.
- **Mac:** Control Centre (top right) → turn **Wi-Fi** off. Unplug any Ethernet cable.

Open a browser and load any website. It should fail. Good.

## Keep chatting

1. In Jan, start a **New Chat** with Qwen3.5-2B.
2. Ask: *Explain compound interest with an example in rupees.*
3. It answers. There is nothing to connect to, because the AI is on your laptop.

## Close and reopen, still offline

1. Close Jan completely.
   - Windows: close the window, then right-click Jan in the system tray (^ near the clock) → Quit, if it is there.
   - Mac: Cmd + Q.
2. Open Jan again.
3. Your old chats are still in the sidebar. Send a new message. It works.

## Turn the internet back on

Turn Airplane mode off (Windows) or Wi-Fi on (Mac). When Jan has internet again, it may check for updates (chapter 08). Your chats are not uploaded anywhere. Jan has no chat sync.

## What this proves, and what it does not

- **Proves:** the AI's thinking happens on your laptop (local inference), and chatting works offline.
- **Does not prove:** that Jan never uses the internet at other times. Chapter 08 covers that.

## Check it works

You got an answer with no internet, and your chat history survived a full restart.

## Exercise

Still offline, open the Hub and search for a model. What happens? Write down which parts of Jan need the internet and which do not.
