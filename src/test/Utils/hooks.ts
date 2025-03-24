import { chromium, Page, Browser, BrowserContext } from "@playwright/test";
import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { pageFixtures } from "./pageFixtures";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
  });
  context = await browser.newContext();
  page = await context.newPage();
  pageFixtures.page = await page;
});

AfterAll(async function () {
  await pageFixtures.page.close();
  await context.close();
});

After(async function ({ pickle, result }) {
  if (result?.status == Status.FAILED) {
    const images = await pageFixtures.page.screenshot({
      path: `./test-result/screenshot/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(images, "image/png");
  }
});
