import { test, expect } from '@playwright/test'

test('basic user flow', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/')


  let random = Math.ceil(Math.random()*1000)
  const randomTitle = 'Test title ' + random
  const randomContent = 'Test content ' + random

  await page.click("text='New Discussion'")
  await page.getByLabel('title').fill(randomTitle);
  await page.getByLabel('content').fill(randomContent);
  await page.getByLabel('lectures').check();

  await page.click("text='Save'")
  await page.click("text='Submit'")

  await page.goto('http://127.0.0.1:8080/customer')
  await expect(page.getByText(randomTitle)).toBeVisible();
  await expect(page.getByText(randomContent)).toBeVisible();

});
