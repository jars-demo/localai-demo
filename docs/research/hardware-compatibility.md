# Hardware Compatibility (Stage 4)

Research date: 2026-11-07.

## Hard requirements (Jan v0.8.8)

Source: https://docs.jan.ai/desktop/install/windows

| Requirement | Value | What happens if you don't meet it |
|---|---|---|
| Windows | 10 or 11 | Won't install |
| CPU | x64 **with AVX2**, or ARM64 | The local engine won't run. There's **no non-AVX build** (https://docs.jan.ai/desktop/troubleshooting) |
| RAM | 8 GB minimum, 16 GB recommended | Only tiny models; frequent out-of-memory errors |
| Disk | 10 GB free | App + engine + 1–2 models. Plan for more if you try several models. |
| GPU | Optional. 6 GB VRAM listed as the minimum for acceleration. | Runs on CPU, slower |

## "Is my CPU too old?": beginner check

- AVX2 arrived with **Intel 4th-gen Core ("Haswell", 2013)** and **AMD Excavator (2015)**. Every AMD Ryzen has it. FACT for the generations: Jan docs.
- How to check: **Settings → System → About**, read "Processor". Any Intel Core i3/i5/i7 of 4th gen or newer (model numbers like i5-4xxx and up), or any Ryzen, is fine.
- **Caveat:** some low-end Intel **Celeron/Pentium** chips of that era lack AVX2 (ASSUMPTION based on Intel's product segmentation). If unsure, look up the exact CPU on https://www.intel.com/content/www/us/en/ark.html and check "Instruction Set Extensions" for AVX2.

## How to check RAM and GPU (no software needed)

**Task Manager → Performance tab** (Ctrl+Shift+Esc):
- **Memory:** total RAM, and how much is "In use" right now.
- **GPU 0 / GPU 1:** GPU name, and "Dedicated GPU memory" (= VRAM). Integrated graphics show "Shared GPU memory" only.

## What to expect by tier

These are **expectations, not measured benchmarks**. Replace them with your own measurements if you can.

| Laptop | Model | Expected experience |
|---|---|---|
| 8 GB RAM, integrated graphics | Qwen3.5-2B Q4 (1.28 GB) | Works. Answers come word by word, slowly; fine for short questions. Close Chrome first. Long conversations get slower. |
| 16 GB RAM, integrated graphics | Jan-v3.5-4B Q4 (2.72 GB) | Usable for everyday chat. Noticeably slower than ChatGPT. |
| 16 GB RAM + NVIDIA 6–8 GB (e.g. RTX 4050/4060 Laptop) | Jan-v3.5-4B or Qwen3.5-9B Q4 | Fast. The 4B feels close to cloud speed; the 9B is still comfortable. |

RTX 4060 Laptop GPU = **8 GB GDDR6**; RTX 4050 Laptop = **6 GB GDDR6** (FACT: https://www.nvidia.com/en-in/geforce/laptops/compare/).

## GPU notes

- **NVIDIA:** keep the driver updated (GeForce Experience / NVIDIA App, or https://www.nvidia.com/en-in/drivers/). Jan bundles CUDA 13, so **no CUDA Toolkit install is needed** (FACT: https://docs.jan.ai/desktop/troubleshooting).
- **AMD / Intel GPUs:** Jan uses **Vulkan**. Update the graphics driver. Whether an *integrated* GPU gives a real speed-up over CPU is **UNVERIFIED**; test it.
- **Laptops on battery:** Windows power-saving can throttle CPU and GPU heavily. **Plug in the charger** for the demo and for viewers (common knowledge; ASSUMPTION about the size of the effect).
- **Dual-GPU laptops:** Jan's setup shows **"Will use your GPU"** or **"Will run on CPU"**, which tells the viewer instantly what was detected (FACT: setup.json).

## Honest lines for the video

- "On an 8 GB laptop this works, but it's not ChatGPT speed. Think 'patient assistant', not 'instant genius'."
- "Small models make more mistakes, especially facts, maths and recent events. They also don't know anything that happened after their training."
- "Your laptop's fan *will* spin. That's your laptop doing the work a data centre usually does."

## Simulating a low-end laptop on your RTX 4060 machine

For an honest demo: **Settings → Hardware → GPUs**, switch the GPU **off**, reload the model, and record the speed. That's roughly what a CPU-only viewer will see (ASSUMPTION: your CPU is likely faster than a budget laptop's, so say "it can be even slower on older laptops").
