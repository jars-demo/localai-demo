# Model Recommendations (Stage 3)

Research date: 2026-11-07. All file sizes come from the Hugging Face API (`/api/models/<repo>?blobs=true`) on this date. Licences come from each repo's model card.

## How to read this

- **Quantisation (Q4_K_M etc.):** a compressed version of the model. Q4 ≈ 4 bits per weight, the usual sweet spot for laptops. Lower numbers are smaller and faster but slightly dumber.
- **RAM needed ≈ file size + ~1–2 GB** for the conversation memory (context) and the engine. This is an **ESTIMATE** (rule of thumb), not a vendor figure. Jan's docs advise keeping models **under 80% of available RAM** (https://docs.jan.ai/desktop/troubleshooting).
- Windows itself plus a browser typically uses several GB. On an 8 GB laptop, assume only ~3–4 GB is free for the model. This is an **ASSUMPTION**; check it in Task Manager.
- No tokens/second numbers are given here, because none could be verified for *your* hardware. **Measure them during recording.**

---

## Tier A: Low-end: 8 GB RAM, integrated graphics  ← **the only model demoed on camera**

### Primary: **Qwen3.5-2B, Q4_K_M**
| | |
|---|---|
| Repo | https://huggingface.co/unsloth/Qwen3.5-2B-GGUF (base: https://huggingface.co/Qwen/Qwen3.5-2B) |
| File | `Qwen3.5-2B-Q4_K_M.gguf`, **1.28 GB** |
| Vision file | `mmproj-F16.gguf`, **0.67 GB** (668,227,264 bytes, https://huggingface.co/unsloth/Qwen3.5-2B-GGUF/tree/main). FACT from the Windows recording: Jan downloads it with the model and lists the model as 1.2 GB, so the download is about 2 GB in total. |
| Hub copies | Several Qwen3.5-2B copies are listed. Use `unsloth/Qwen3.5-2B-GGUF`; skip "Uncensored" copies. FACT from the user testing Jan: search the full name `unsloth/Qwen3.5-2B-GGUF`, because a plain `Qwen3.5-2B` search may not show this copy. |
| Licence | Apache-2.0 |
| RAM (est.) | ~2.5–3.5 GB |
| GPU VRAM | Not needed |
| Conversation | Yes, but basic |
| Basic reasoning | Simple tasks only |
| Limitation | Qwen3.5 runs in **"thinking mode" by default** (https://huggingface.co/Qwen/Qwen3.5-4B). It writes out reasoning before the answer, which **adds waiting time on slow CPUs**. **Fix (FACT):** Jan v0.8.8 has a **Reasoning** control (auto / on / off). **Off** sends `enable_thinking: false` to the engine (https://github.com/janhq/jan/blob/v0.8.8/web-app/src/lib/custom-chat-transport.ts). Its exact position in the UI is **UNVERIFIED**; find it while recording. |

### Fallback: **Llama 3.2 3B Instruct, Q4_K_M**
| | |
|---|---|
| Repo | https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF (base: https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct) |
| File | `Llama-3.2-3B-Instruct-Q4_K_M.gguf`, **2.02 GB** |
| Licence | **Llama 3.2 Community License**, not Apache. Free to use, but has conditions; read it before commercial use. |
| RAM (est.) | ~3–4 GB |
| Why fallback | No thinking mode, so it answers straight away and feels faster on weak CPUs. It's older (2024), so quality is lower than Qwen3.5. |

---

## Tier B: Standard: 16 GB RAM, integrated or entry GPU

### Primary: **Jan-v3.5-4B, Q4_K_M**
| | |
|---|---|
| Repo | https://huggingface.co/janhq/Jan-v3.5-4B-gguf |
| File | `Jan-v3.5-4B-Q4_K_M.gguf`, **2.72 GB** (Q4_K_XL is 3.00 GB) |
| Base | Jan-v3-4B-base-instruct, built on Qwen3-4B-Instruct-2507 (an instruct, non-thinking model) |
| Licence | Apache-2.0 |
| RAM (est.) | ~4–5 GB |
| GPU VRAM | Optional. It fits fully in a 4 GB+ GPU (estimate). |
| Conversation | Yes, good general chat |
| Basic reasoning | Yes. The model card says it's fine-tuned for math reasoning. |
| Why this one | Made for Jan (*"optimized for direct integration with Jan Desktop"*), small enough for 16 GB laptops, and no long thinking delay. It's most likely what Jan's setup screen recommends (**UNVERIFIED**; check on screen). |

### Alternative: **Qwen3.5-4B, Q4_K_M**
- `Qwen3.5-4B-Q4_K_M.gguf`, **2.74 GB**, Apache-2.0, https://huggingface.co/unsloth/Qwen3.5-4B-GGUF
- Newer general model with vision support (needs the extra `mmproj` file, ~0.67 GB) and 201 languages. Thinking mode is on by default, so it's slower to start answering.

### Alternative: **Gemma 4 E2B-it, Q4_K_M**
- `gemma-4-E2B-it-Q4_K_M.gguf`, **3.11 GB**, Apache-2.0, https://huggingface.co/unsloth/gemma-4-E2B-it-GGUF (base: https://huggingface.co/google/gemma-4-E2B-it)

---

## Tier C: Better hardware: 16–32 GB RAM + NVIDIA GPU (your RTX 4060 Laptop, 8 GB VRAM)

### Primary: **Qwen3.5-9B, Q4_K_M**
| | |
|---|---|
| Repo | https://huggingface.co/unsloth/Qwen3.5-9B-GGUF (base: https://huggingface.co/Qwen/Qwen3.5-9B) |
| File | `Qwen3.5-9B-Q4_K_M.gguf`, **5.68 GB** |
| Licence | Apache-2.0 |
| RAM (est.) | ~7–8 GB if run on CPU |
| GPU VRAM | 5.68 GB of weights + context. It **should fit in 8 GB VRAM at the default 8192 context** (ESTIMATE; Jan's fit pill will confirm). RTX 4060 Laptop = 8 GB GDDR6 (https://www.nvidia.com/en-in/geforce/laptops/compare/). |
| Conversation | Yes, noticeably better than 4B |
| Basic reasoning | Yes, the best of this list for reasoning |
| Limitation | Thinking mode is on by default. It's fast on the GPU, so that matters less here. |

### Alternative: **Gemma 4 12B-it, Q4_K_M**
- `gemma-4-12b-it-Q4_K_M.gguf`, **7.12 GB**, Apache-2.0, https://huggingface.co/unsloth/gemma-4-12b-it-GGUF
- **Tight on 8 GB VRAM.** It'll likely spill partly into system RAM and slow down (ESTIMATE). Don't use it as the demo model.

### Not recommended for this video
- Gemma 4 26B-A4B and 31B, and anything with 14B+ parameters: they need more memory than the target audience has.

---

## Final decision for the tutorial

| Use | Model | Size |
|---|---|---|
| **The only model demoed (video, workshops, hackathons)** | Qwen3.5-2B Q4_K_M, Reasoning: Off | 1.28 GB |
| Mentioned only: "upgrade if you have 16 GB" | Jan-v3.5-4B Q4_K_M | 2.72 GB |
| Mentioned only: "upgrade if you have an NVIDIA GPU" | Qwen3.5-9B Q4_K_M | 5.68 GB |
| Backup if Qwen3.5-2B misbehaves | Llama 3.2 3B Q4_K_M | 2.02 GB |

Why the lightweight model only: **one model that every attendee can run** means one set of instructions, one download, and no "mine doesn't fit" in a workshop room. A 1.28 GB download is also realistic over shared venue Wi-Fi. It runs fast on the RTX 4060, so when you show the GPU-off comparison, **say on screen that older laptops will be slower still.**

## To verify while recording
- Jan Hub fit pills for each model on your laptop (screenshot them).
- Real speed: note the tokens/sec Jan shows (if displayed) for 4B on GPU, and for 4B with GPU switched OFF (to simulate a CPU-only laptop).
