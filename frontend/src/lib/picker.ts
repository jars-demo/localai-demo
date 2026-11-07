// Laptop to advice, for the "Will my laptop run it" picker on the home page.
// Every rule here comes from chapter 02 and docs/research/; change them together.

export type Os = 'windows' | 'mac'
export type MacChip = 'apple' | 'intel'
export type Memory = 4 | 8 | 16 | 32
export type Gpu = 'none' | 'nvidia-6' | 'nvidia-8'
export type Drive = 'second' | 'single'

export type Laptop = {
  os: Os
  chip: MacChip
  memory: Memory
  gpu: Gpu
  drive: Drive
}

export type Verdict = 'go' | 'slow' | 'no'

export type Advice = {
  verdict: Verdict
  headline: string
  start?: string
  upgrade?: string
  dataFolder?: string
  notes: string[]
}

export const START_MODEL = 'Qwen3.5-2B, Q4_K_M (1.28 GB)'
const MID_MODEL = 'Jan-v3.5-4B, Q4_K_M (2.72 GB)'
const BIG_MODEL = 'Qwen3.5-9B, Q4_K_M (5.68 GB)'

export const DEFAULT_LAPTOP: Laptop = {
  os: 'windows',
  chip: 'apple',
  memory: 8,
  gpu: 'none',
  drive: 'second',
}

function upgradeFor(laptop: Laptop): string | undefined {
  if (laptop.os === 'windows') {
    if (laptop.gpu === 'nvidia-8') return BIG_MODEL
    if (laptop.gpu === 'nvidia-6' || laptop.memory >= 16) return MID_MODEL
    return undefined
  }
  if (laptop.memory >= 32) return BIG_MODEL
  if (laptop.memory >= 16) return MID_MODEL
  return undefined
}

function dataFolderFor(laptop: Laptop): string {
  if (laptop.os === 'windows') {
    return laptop.drive === 'second'
      ? 'Move it to a Jan folder on your other drive (D:, E:, F: or whichever you have) right after setup: Settings → General → App Data → Change Location.'
      : 'Keep the default on C:, or use an external SSD. Do not partition your disk just for this.'
  }
  return laptop.drive === 'second'
    ? 'Use a folder on the external SSD, and plug it in before you open Jan.'
    : 'Keep the default, ~/Library/Application Support/Jan/data.'
}

export function advise(laptop: Laptop): Advice {
  if (laptop.os === 'mac' && laptop.chip === 'intel') {
    return {
      verdict: 'no',
      headline: 'Jan cannot run local models on an Intel Mac.',
      notes: ['LM Studio needs Apple Silicon too. You need an M1 or newer Mac for this workshop.'],
    }
  }
  if (laptop.memory < 8) {
    return {
      verdict: 'no',
      headline: 'Below the 8 GB minimum. It may not run at all.',
      notes: ['Try it with every other app closed, but plan to use a different laptop.'],
    }
  }

  const notes: string[] = []
  if (laptop.os === 'windows') {
    notes.push('Your processor needs AVX2: Intel Core 4th gen (2013) or newer, or any AMD Ryzen.')
    if (laptop.gpu === 'none') notes.push('Plug in the charger. Expect a few words per second.')
    else notes.push('Update the NVIDIA driver. Jan brings its own CUDA, no toolkit needed.')
  } else {
    notes.push('Jan uses your Mac’s graphics automatically. You need macOS 13.6 or newer.')
  }

  const slow = laptop.os === 'windows' && laptop.gpu === 'none' && laptop.memory === 8
  return {
    verdict: slow ? 'slow' : 'go',
    headline: slow ? 'It runs. Be patient.' : 'You are good to go.',
    start: START_MODEL,
    upgrade: upgradeFor(laptop),
    dataFolder: dataFolderFor(laptop),
    notes,
  }
}
