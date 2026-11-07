# First chat and real scenarios

> Turn off the model's thinking out loud, ask useful questions, and learn where a small local model shines and where it falls over.

**Time:** 15 minutes

## Goal

Have a real conversation, try it on everyday scenarios, and see its limits with your own eyes.

## One setting first: Reasoning off

Qwen3.5 models "think out loud" before answering by default. Great for puzzles, slow for chat, especially without a graphics card. Jan has a **Reasoning** control with auto, on and off. Set it to **Off** for this chapter.

Source: [Qwen3.5 model card](https://huggingface.co/Qwen/Qwen3.5-4B) (thinking on by default) and Jan v0.8.8 ([reasoning control](https://github.com/janhq/jan/blob/v0.8.8/web-app/src/lib/custom-chat-transport.ts)).

## Your first chat

1. Click **New Chat**.
2. Pick **Qwen3.5-2B** in the model picker.
3. Set **Reasoning** to **Off**.
4. Ask: *Explain what a CPU does, like I am 12.*

The first answer is slower because the model is loading into memory. Then it speeds up.

## Scenarios to try

| Who | Try this |
| --- | --- |
| Student | *Quiz me with 5 questions on photosynthesis. Wait for my answer each time.* |
| Job hunter | *I have an interview for a data analyst internship tomorrow. Give me 5 likely questions and a short tip for each.* |
| Office worker | *Rewrite this email to sound polite but firm:* (paste a draft) |
| Small business | *Write a WhatsApp message announcing our Diwali offer, under 50 words.* |
| Developer | *Explain this error and suggest a fix:* (paste an error message) |
| Privacy-minded | your three things from chapter 01 |

## Where it falls over

Try these on purpose, so you know:

- *Who won the most recent cricket World Cup?* It does not know recent events, and may answer confidently anyway.
- *What is 4,837 × 2,961?* Small models are bad at exact arithmetic. Use a calculator.
- Ask the same factual question twice in new chats. The answers may differ.

Rule of thumb: treat it like a smart friend, not like a doctor, lawyer or search engine.

## See your laptop working

While an answer is being written:

- **Windows:** Task Manager → Performance. CPU or GPU jumps.
- **Mac:** Activity Monitor → CPU or GPU history (Window → GPU History).

That is your laptop doing what a data centre usually does.

## Check it works

You got sensible answers to at least three scenarios, and you saw one wrong or made-up answer.

## Exercise

Turn **Reasoning** to **On** and ask the arithmetic question again. Compare the wait and the answer with Reasoning off. When is the wait worth it?
