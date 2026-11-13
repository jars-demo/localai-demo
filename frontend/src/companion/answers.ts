export type CompanionAnswer = { question: string; answer: string }

// What Dot can answer. Fixed answers only, so it never makes anything up.
// Every answer comes from the chapters; change them together. Plain English, no em dashes.

export const DOT_GREETING = 'Hi, I’m Dot. Stuck somewhere? Ask me.'

export const DOT_ANSWERS: readonly CompanionAnswer[] = [
  {
    question: 'Where do I start?',
    answer:
      'Open Follow along at the top of the page. Pick Windows or Mac and your drive, then do each step and tick it off. About an hour, no code.',
  },
  {
    question: 'Will my laptop run it?',
    answer:
      'You need 8 GB of memory (16 is better) and 10 GB free. Windows needs a processor with AVX2, most from 2013 on. Macs need Apple Silicon, M1 or newer. Intel Macs cannot run local models in Jan.',
  },
  {
    question: 'Which drive should I pick?',
    answer:
      'Any drive that is not C:, like D:, E: or F:. Make a folder called Jan on it. Only have C:? Keep the default. On a Mac, the default is fine.',
  },
  {
    question: 'Jan says “Cannot relocate data folder”',
    answer:
      'You picked the drive itself, like D:\\. Pick the Jan folder inside it instead, like D:\\Jan.',
  },
  {
    question: 'Setup is stuck',
    answer:
      'First-time setup downloads Jan’s engine, so it needs the internet. Check your connection, then click Re-run checks.',
  },
  {
    question: 'Which model do I download?',
    answer:
      'In Jan’s Hub, search Qwen3.5-2B and pick the Q4_K_M version, 1.28 GB. Its label should say Fits.',
  },
  {
    question: 'It’s really slow',
    answer:
      'Set Reasoning to Off in the chat. Plug in your charger and close other apps. The first answer is always slower while the model loads into memory.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Chatting does, once setup and the model download are done. Turn on airplane mode and try it: that is the Pull the plug step.',
  },
  {
    question: 'Is it private?',
    answer:
      'Your chats are not sent to an AI company. But Jan checks for updates by default, and chats are saved as plain-text files on your disk. Lock your laptop and turn on disk encryption.',
  },
  {
    question: 'Where are my chats saved?',
    answer:
      'In the threads folder inside Jan’s data folder, for example D:\\Jan\\threads. Each chat is a folder with a messages.jsonl file you can open in Notepad.',
  },
  {
    question: 'Is there a video?',
    answer:
      'Yes. It is on the home page and on YouTube (youtu.be/w8i5U98H_yk). The follow-along page has every step, and it matches the video.',
  },
]
