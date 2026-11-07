// Questions people ask before trying local AI. Every answer comes from the chapters.
// Shown on the home page and given to search engines as FAQPage data; keep the two the same.

import { JsonLd } from './JsonLd'

export const FAQ: [string, string][] = [
  [
    'Is it really free?',
    'Yes. Jan is free and open source, and the model in this workshop, Qwen3.5-2B, is free to download under the Apache-2.0 licence. No subscription, no account, no API key.',
  ],
  [
    'Does it work without internet?',
    'Chatting does, once setup and the model download are done. The first-time setup and downloading models need the internet, and Jan checks for updates when it is online.',
  ],
  [
    'Will it run on my laptop?',
    'You need 8 GB of memory (16 GB is better) and 10 GB of free disk. On Windows, a processor with AVX2, which most from 2013 onwards have. On a Mac, Apple Silicon, M1 or newer. Intel Macs cannot run local models in Jan.',
  ],
  [
    'Is it as good as ChatGPT?',
    'No. A small model on a laptop is less clever, does not know recent news, and can be confidently wrong. It is good for everyday writing, explaining and practice, and it never sends your chats to an AI company.',
  ],
  [
    'Is it completely private?',
    'Your chats with a local model are not sent to an AI company. But setup and downloads use the internet, Jan checks for updates by default, and chats are saved as plain-text files on your disk. Lock your laptop and turn on disk encryption.',
  ],
  [
    'Why move the data off the C: drive?',
    'Models are big and fill the system drive, and a Windows reset usually wipes C:. Keeping Jan’s data in a folder on another drive, such as D:, E: or F:, keeps it safe and easy to find.',
  ],
  [
    'Do I need to know how to code?',
    'No. Everything is clicking in an app. The follow-along page gives every step for Windows or Mac, with a checklist.',
  ],
]

export function Faq() {
  return (
    <>
      <div className="card divide-y divide-line overflow-hidden">
        {FAQ.map(([question, answer]) => (
          <details key={question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold hover:bg-accent-wash [&::-webkit-details-marker]:hidden">
              {question}
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-lg border-2 border-ink bg-sun text-[16px] leading-none font-bold transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-2">{answer}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@type': 'FAQPage',
          mainEntity: FAQ.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }}
      />
    </>
  )
}
