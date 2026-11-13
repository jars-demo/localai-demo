# Your first model

> Jan without a model is WhatsApp without contacts. Download one small brain file that runs on almost any laptop.

**Time:** 10 minutes

## Goal

Download **Qwen3.5-2B** in the **Q4_K_M** version (1.28 GB) and confirm it landed in the data folder you chose, not on your system drive.

## What a model is

A model is a single file that holds everything the AI learned during training. Bigger models are smarter and heavier. The number in the name is roughly how big it is: "2B" means about 2 billion settings (parameters). You do not need to remember that.

Every attendee uses the same small model, so everyone can follow every step, even on an 8 GB laptop. You can try bigger ones later (chapter 10).

## What Q4_K_M means

The same model comes in several compressed versions. Q4 keeps about 4 bits per setting. Smaller and faster, slightly less clever. For laptops, Q4_K_M is the usual sweet spot.

| Model | Version | Download | Licence |
| --- | --- | --- | --- |
| Qwen3.5-2B | Q4_K_M | 1.28 GB | Apache-2.0 |

Source: [unsloth/Qwen3.5-2B-GGUF on Hugging Face](https://huggingface.co/unsloth/Qwen3.5-2B-GGUF), based on [Qwen/Qwen3.5-2B](https://huggingface.co/Qwen/Qwen3.5-2B).

## Download it

1. In Jan, open **Hub** in the left sidebar. (If the setup screen suggests a different model, choose **Browse other models in the Hub**.)
2. Search for `Qwen3.5-2B`. The Hub lists several copies. Pick the one by **Unsloth** (`unsloth/Qwen3.5-2B-GGUF`). Skip copies with "Uncensored" in the name.
3. Open it. Jan shows a label for your laptop:
   - **Fits**: go ahead.
   - **May be slow**: it works, slowly.
   - **Won't fit**: something is wrong for a 1.28 GB model. Close other apps and check chapter 02.
4. Choose the **Q4_K_M** version and click **Download**. Jan's list may round the size to 1.2 GB. Jan also downloads a small vision file (`mmproj`, about 0.67 GB), so expect about 2 GB in total.
5. Watch the progress in the top bar. The **×** cancels. If it fails, click **Download** again.

The file comes from huggingface.co. This is one of the moments Jan uses the internet.

## Workshop tip: one download, many laptops

Venue Wi-Fi and 50 people downloading 1.28 GB each do not mix. A facilitator can download the `.gguf` file once, copy it to pen drives, and attendees **import** it: Settings → Model Providers → Llama.cpp → import the file. Put it on the data drive you chose, not the desktop.

## Check it works

- The model appears in the model picker in a new chat.
- Look in your data folder: `X:\Jan\llamacpp\models\` on Windows, or the folder from chapter 04 on Mac. The `.gguf` file is there, about 1.3 GB.
- Your system drive did **not** gain 1.3 GB. If it did, go back to chapter 03 step 4.

## Exercise

Search the Hub for `Jan-v3.5-4B` and `Qwen3.5-9B`, but do not download them. Note the label each one gets on your laptop. That tells you how far you can upgrade later.
