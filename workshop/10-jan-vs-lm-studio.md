# Jan or LM Studio, and what next

> Two good apps for the same job. Why this workshop uses Jan, when LM Studio is the better pick, and how to upgrade your model.

**Time:** 8 minutes

## Goal

Know the alternative, know when to upgrade the model, and leave with a next step.

## Jan and LM Studio, side by side

| | Jan | LM Studio |
| --- | --- | --- |
| Source code | open source (Apache-2.0) | closed source |
| Price | free | free, at home and at work |
| Windows | x64 with AVX2, or ARM64 | x64 with AVX2, or ARM (Snapdragon) |
| Mac | Apple Silicon, macOS 13.6+ | Apple Silicon, macOS 14+ |
| Memory | 8 GB minimum, 16 GB recommended | 16 GB recommended |
| Chat offline | yes | yes |
| Telemetry | opt-in analytics, off by default | "does not include telemetry", per its policy |
| Update check | on by default, can be turned off | on every launch |
| Chat with documents | yes, processed locally | yes, processed locally |
| Feels like | close to ChatGPT, fewer knobs | more panels and settings |

Sources: [Jan Windows](https://docs.jan.ai/desktop/install/windows), [Jan Mac](https://docs.jan.ai/desktop/install/mac), [Jan privacy](https://docs.jan.ai/desktop/privacy), [LM Studio requirements](https://lmstudio.ai/docs/app/system-requirements), [LM Studio offline](https://lmstudio.ai/docs/app/offline), [LM Studio privacy](https://lmstudio.ai/app-privacy), [free for work](https://lmstudio.ai/blog/free-for-work).

**Why Jan here:** for a privacy workshop, "you can read the code" beats "trust our policy". It is also the closest to ChatGPT for a first-timer.

**Pick LM Studio if:** you want more control over model settings, or a policy that says no telemetry at all.

The models are the same GGUF files, so nothing you learned here is wasted.

## Upgrading your model

Use the labels you noted in chapter 05.

| Your laptop | Try next | Download |
| --- | --- | --- |
| 16 GB memory | Jan-v3.5-4B, Q4_K_M | 2.72 GB |
| NVIDIA card with 8 GB, or a 16 GB+ Mac | Qwen3.5-9B, Q4_K_M | 5.68 GB |
| Old or 8 GB laptop where Qwen3.5-2B is too slow | Llama 3.2 3B, Q4_K_M | 2.02 GB |

Bigger models land in the same data folder, so check the free space on that drive first. Llama 3.2 uses Meta's community licence, not Apache-2.0. Read it before using it for business.

Sources: [Jan-v3.5-4B](https://huggingface.co/janhq/Jan-v3.5-4B-gguf), [Qwen3.5-9B](https://huggingface.co/unsloth/Qwen3.5-9B-GGUF), [Llama 3.2 3B](https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF).

## What next

- Chat with your own documents: the **+** button in a chat → **Add documents or files**. With a local model, files are processed on your laptop ([Jan file upload](https://docs.jan.ai/desktop/file-upload)).
- Developers: Jan runs an OpenAI-compatible API on `127.0.0.1:1337` ([Jan local API](https://docs.jan.ai/desktop/api-server)). Build on it without any cloud key.
- Build a full app on local AI: the [Local AI workshop](https://local-ai.jishanahmed.in).

## Check it works

You can name one reason to pick Jan and one to pick LM Studio.

## Exercise

Back up your `threads` folder to another drive or a pen drive. Then open one backed-up `messages.jsonl` to confirm the copy is readable.
