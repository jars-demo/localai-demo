# AI basics: plain-English definitions and sources

The beginner terms used in the explainer video and on the site. Keep the wording simple, but never wrong.

| Term | Plain-English wording we use | Label | Source |
| --- | --- | --- | --- |
| AI | Computers doing things that usually need human thinking, like spotting spam or suggesting the next video | FACT (standard definition) | https://en.wikipedia.org/wiki/Artificial_intelligence |
| Generative AI | AI that creates something new: text, pictures, music, code | FACT. IBM: "artificial intelligence (AI) that can create original content" | https://www.ibm.com/think/topics/generative-ai |
| LLM | A Gen AI that learned from a huge amount of text. Its main skill is language. Many newer ones can also handle pictures or audio | FACT. Wikipedia: "trained on a vast amount of text"; "many LLMs have been trained to be multimodal" | https://en.wikipedia.org/wiki/Large_language_model |
| GPT | One kind of LLM: Generative, Pre-trained, Transformer. OpenAI built the first in 2018 (GPT-1) and names its models after it. Others build GPT-style models too (for example EleutherAI's GPT-J) | FACT. OpenAI calls "GPT" its brand; the USPTO rejected the trademark in 2023. Do not say GPT is only OpenAI's | https://en.wikipedia.org/wiki/Generative_pre-trained_transformer |
| Transformer | The design inside these models, published by researchers at Google in 2017 ("Attention Is All You Need") | FACT | https://arxiv.org/abs/1706.03762 |
| ChatGPT | OpenAI's chat app, launched 30 November 2022, talking to OpenAI's GPT models in data centres | FACT | https://en.wikipedia.org/wiki/ChatGPT |
| Qwen3.5-2B | An LLM from the Qwen team at Alibaba. About 2B parameters. The model card calls it a "Causal Language Model with Vision Encoder" | FACT | https://huggingface.co/Qwen/Qwen3.5-2B · https://github.com/QwenLM |
| Parameters | The model's numbers ("dials"), nudged during training. More parameters is more capacity, **not** "trained on more data" | FACT (do not equate size with data) | https://en.wikipedia.org/wiki/Large_language_model |
| Token | A small chunk of text: often a whole word, sometimes part of a word or punctuation. Each model splits text its own way | FACT | https://en.wikipedia.org/wiki/Large_language_model |
| Context window | How many tokens the model can see at once | FACT | https://en.wikipedia.org/wiki/Large_language_model |
| Hallucination | A confident answer that is wrong | FACT | https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence) |
| Quantization | Storing each number with less detail, so the file is smaller and only a little less capable | FACT | https://huggingface.co/docs/optimum/concept_guides/quantization |

## Still to confirm on camera

- Jan asks for no account or sign-in: not stated in Jan's docs. **UNVERIFIED** until the first-run recording shows it.
