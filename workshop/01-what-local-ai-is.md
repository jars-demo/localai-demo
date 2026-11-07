# What local AI is

> ChatGPT runs in someone else's kitchen. Local AI runs in yours. Learn the difference before you install anything.

**Time:** 8 minutes

## Goal

Understand what "running AI locally" means, what it gives you, and what it does not. No installs yet.

## Restaurant or home kitchen

Using ChatGPT, Gemini or Claude is like ordering from a restaurant. You send your order (your message) to their kitchen (their data centre). They cook the answer and send it back. It is fast and tasty, but your order goes to their kitchen, and they know what you ordered.

Local AI is cooking at home. You bring the ingredients home once. After that you cook in your own kitchen, and nobody else sees what you made.

| In the kitchen story | In real life |
| --- | --- |
| The ingredients | the **model**: one big file, 1 to 6 GB, that holds everything the AI learned |
| The kitchen | **Jan**, a free and open source app that runs the model |
| The stove | your laptop's processor (CPU) and graphics chip (GPU) |
| The restaurant | a cloud AI service in a data centre |

## Cloud AI and local AI, side by side

| | Cloud AI (ChatGPT and friends) | Local AI (Jan + a model) |
| --- | --- | --- |
| Where the thinking happens | a data centre | your laptop |
| Needs internet to chat | yes | no, after setup |
| Monthly cost | free tier with limits, or a subscription | free |
| Who can see your messages | the AI company | nobody, unless someone gets into your laptop |
| How smart | very | noticeably less, because the model is small |
| Knows recent news | often, with web search | no, only what it learned in training |
| Speed | fast | depends on your laptop |

Local AI is not "ChatGPT for free". It is a smaller, slower AI that lives with you. For a lot of daily work that is enough.

## Five words people mix up

These are five separate things. An app can do one and not another.

1. **Local inference.** The AI's thinking happens on your laptop.
2. **Offline operation.** The app keeps working with Wi-Fi off.
3. **Local storage.** Your chats are saved as files on your disk.
4. **Telemetry.** The app sends usage statistics to its makers.
5. **Cloud inference.** Your message is sent to a company's server to get an answer.

In this workshop, Jan with a downloaded model does 1, 2 and 3. It does 4 only if you say yes. It does 5 only if you add a cloud provider yourself. Chapter 08 proves each of these on your own machine.

## What you will have at the end

- Jan installed on Windows or macOS.
- Jan's data (chats and models) on a drive you chose, not tucked inside your operating system's folders.
- One small model, **Qwen3.5-2B**, that runs on almost any laptop from the last ten years.
- A chat that works with the internet switched off.
- A clear idea of what leaves your laptop and what does not.

## Check it works

You can explain, in one sentence each, the difference between local inference, offline operation and local storage.

## Exercise

Write down three things you would ask an AI but would rather not send to a company's server. Keep the list. You will try them in chapter 06.
