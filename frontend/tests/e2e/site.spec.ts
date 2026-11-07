import { expect, test } from '@playwright/test'

test('home explains the workshop and starts it', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Your own private ChatGPT.')
  await expect(page.getByRole('figure')).toContainText('No internet')

  await expect(page.getByRole('region', { name: /Watch it once/ })).toContainText('Coming soon')

  await page.getByRole('tab', { name: /Cloud AI/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('in a data centre')

  await page.getByRole('link', { name: 'Follow along, step by step' }).click()
  await expect(page).toHaveURL(/\/follow-along$/)
})

test('follow along fills in your drive and keeps your progress', async ({ page }) => {
  await page.goto('/follow-along')
  const setup = page.getByRole('form', { name: 'Your setup' })
  await setup.getByText('F:', { exact: true }).click()
  await expect(page.locator('#step-move')).toContainText('F:\\Jan')

  await page.locator('#step-check').getByText('Mark done').click()
  await expect(page.getByRole('checkbox', { name: /Check your laptop/ })).toBeChecked()
  await expect(page.getByText('1 of 11 done')).toBeVisible()
  await page.reload()
  await expect(page.getByText('1 of 11 done')).toBeVisible()
  await expect(page.locator('#step-move')).toContainText('F:\\Jan')

  await setup.getByText('macOS', { exact: true }).click()
  await expect(page.locator('#step-move')).toContainText('Application Support')
})

test('chapters fill in the drive you picked', async ({ page }) => {
  await page.goto('/workshop/03-install-on-windows')
  const prose = page.locator('.prose-chapter')
  await expect(prose).toContainText('X:\\Jan')
  await page.getByRole('form', { name: 'Your setup' }).getByText('E:', { exact: true }).click()
  await expect(prose).toContainText('E:\\Jan')
  await expect(prose).not.toContainText('X:\\Jan')
})

test('the laptop picker gives honest advice', async ({ page }) => {
  await page.goto('/')
  const result = page.locator('output')
  await expect(result).toContainText('Qwen3.5-2B')
  await expect(result).toContainText('other drive')

  const form = page.getByRole('form', { name: 'Your laptop' })
  await form.getByText('macOS', { exact: true }).click()
  await form.getByText('Intel', { exact: true }).click()
  await expect(result).toContainText('cannot run local models')
})

test('the chapters list and page through', async ({ page }) => {
  await page.goto('/workshop')
  await expect(page.locator('main ol > li')).toHaveCount(10)

  await page.locator('main ol > li').nth(2).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Install Jan on Windows')
  await page.getByRole('link', { name: /Next/ }).click()
  await expect(page).toHaveURL(/04-install-on-mac$/)
})

test('nothing scrolls sideways', async ({ page }) => {
  for (const path of ['/', '/follow-along', '/workshop', '/workshop/08-what-is-actually-private']) {
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})

test('back to top returns to the top', async ({ page }) => {
  await page.goto('/workshop/09-when-it-breaks')
  await page.evaluate(() => window.scrollTo(0, 3000))
  const button = page.getByRole('button', { name: 'Back to top' })

  await expect(button).toBeVisible()
  await button.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('Dot, the logo companion, answers common questions', async ({ page }) => {
  await page.goto('/follow-along')
  await page.getByRole('button', { name: /Ask Dot/ }).click()
  const panel = page.getByRole('dialog', { name: 'Ask Dot' })
  await panel.getByRole('button', { name: 'Which drive should I pick?' }).click()
  await expect(panel).toContainText('Any drive that is not C:')
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
})

test('share cards, sitemap and robots are in place', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /localai\.jishanahmed\.in\/?$/,
  )
  await page.goto('/follow-along')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/follow-along$/)
  expect((await request.get('/sitemap.xml')).ok()).toBeTruthy()
  expect((await request.get('/robots.txt')).ok()).toBeTruthy()
  expect((await request.get('/opengraph-image.png')).ok()).toBeTruthy()
})
