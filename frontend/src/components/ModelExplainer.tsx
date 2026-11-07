'use client'

import { useState } from 'react'

// "What a model is" for beginners. Sizes are from Hugging Face (docs/research/model-recommendations.md);
// who can run what follows the laptop picker (src/lib/picker.ts).

const MODELS = [
  {
    key: '2b',
    name: 'Qwen3.5-2B',
    billions: 2,
    size: '1.28 GB',
    fits: 'Almost any laptop with 8 GB. This is the one we use.',
  },
  {
    key: '4b',
    name: 'Jan-v3.5-4B',
    billions: 4,
    size: '2.72 GB',
    fits: '16 GB memory, or an NVIDIA card with 6 GB.',
  },
  {
    key: '9b',
    name: 'Qwen3.5-9B',
    billions: 9,
    size: '5.68 GB',
    fits: 'An NVIDIA card with 8 GB, or a Mac with 32 GB.',
  },
] as const

const PIPELINE = [
  ['📁', 'A file on your drive', 'The model is one .gguf file in your data folder.'],
  [
    '🧠',
    'Loaded into memory',
    'When you chat, Jan copies it into RAM, or into graphics memory if you have a GPU.',
  ],
  [
    '⚙️',
    'Your chip does the maths',
    'The CPU or GPU predicts the next small piece of a word, again and again.',
  ],
  [
    '💬',
    'Words appear one by one',
    'That is why answers stream in, and why a faster laptop writes faster.',
  ],
] as const

export function ModelExplainer() {
  const [pick, setPick] = useState<(typeof MODELS)[number]['key']>('2b')
  const model = MODELS.find((m) => m.key === pick) ?? MODELS[0]

  return (
    <div className="grid gap-6">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE.map(([emoji, title, body], index) => (
          <li key={title} className="card relative flex flex-col gap-2 p-5">
            <span className="font-mono text-[12px] text-muted">{index + 1}</span>
            <span className="text-[28px]" aria-hidden="true">
              {emoji}
            </span>
            <span className="text-[16px] font-bold">{title}</span>
            <span className="text-[14px] leading-relaxed text-ink-2">{body}</span>
          </li>
        ))}
      </ol>

      <div className="tiles">
        <div className="card grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-4">
            <h3 className="text-[1.2rem] font-bold">What the “2B” means</h3>
            <p className="text-[15px] leading-relaxed text-ink-2">
              A model is billions of numbers, called{' '}
              <strong className="text-ink">parameters</strong>, tuned while it was trained on huge
              amounts of text. “2B” means about 2 billion of them. More parameters give it more room
              to hold what it learned, so it is usually cleverer, but the file is bigger, needs more
              memory and writes more slowly.
            </p>
            <p className="text-[15px] leading-relaxed text-ink-2">
              <strong className="text-ink">Q4_K_M</strong> is the compressed version: each number is
              squeezed to about 4 bits. A much smaller file, a little less clever. The sweet spot
              for laptops.
            </p>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-[13px] font-semibold">Compare sizes</legend>
              <div className="flex flex-wrap gap-2">
                {MODELS.map((m) => (
                  <label key={m.key} className={`chip ${pick === m.key ? 'is-on' : ''}`}>
                    <input
                      type="radio"
                      name="model-size"
                      className="sr-only"
                      checked={pick === m.key}
                      onChange={() => setPick(m.key)}
                    />
                    {m.billions}B
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div
            aria-live="polite"
            className="flex flex-col gap-4 rounded-2xl border-2 border-ink bg-accent-wash p-5 shadow-[4px_4px_0_var(--ink)]"
          >
            <span className="text-[1.15rem] font-bold">{model.name}</span>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[12px] text-muted uppercase">Parameters</span>
              <div className="flex flex-wrap gap-1" aria-label={`${model.billions} billion`}>
                {Array.from({ length: 9 }, (_, i) => (
                  <span
                    key={i}
                    className={`size-5 rounded-[5px] border-2 border-ink transition-colors ${
                      i < model.billions ? 'bg-sky' : 'bg-surface'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[13px] text-ink-2">each square is 1 billion</span>
            </div>
            <dl className="grid gap-3 text-[14.5px]">
              <div>
                <dt className="font-mono text-[12px] text-muted uppercase">
                  File to download (Q4_K_M)
                </dt>
                <dd className="font-semibold">{model.size}</dd>
              </div>
              <div>
                <dt className="font-mono text-[12px] text-muted uppercase">Runs well on</dt>
                <dd>{model.fits}</dd>
              </div>
            </dl>
            <p className="text-[12.5px] leading-snug text-muted">
              Rule of thumb: you need at least the file size in free memory, plus room for the chat.
              Jan’s Hub labels each model Fits, May be slow or Won’t fit for your laptop.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
