import { Page, Locator } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";

export class LoginPage {
  private Elements = {
    user_loc: "//input[@id='username']",
    pass_loc: "//input[@id='password']",
    sub_loc: "//input[@id='kc-login']",
    username_txt:
      "//gp-navbar//li[3]//span[@class='block l-h-1x _500 text-capitalize nav-user-name']",
  };

  async goTo() {
    await pageFixtures.page.goto(
      "https://globalsolutions-reference.gpi-test.globepayroll.net/ui/#/dashboard"
    );
    await pageFixtures.page.waitForLoadState("networkidle");
  }

  async waitForLoginFormToBeVisible() {
    const loginButton = pageFixtures.page.locator(this.Elements.sub_loc); // Example: adjust for your page
    await loginButton.waitFor({ state: "visible", timeout: 20000 });
  }

  async enterUsername(username: string) {
    await pageFixtures.page.locator(this.Elements.user_loc).fill(username);
  }

  async enterPassword(password: string) {
    await pageFixtures.page.locator(this.Elements.pass_loc).fill(password);
  }

  async submit() {
    await pageFixtures.page.locator(this.Elements.sub_loc).click();
  }

  async enterCredentialsAndSubmit(username: string, password: string) {
    //await enterUsername('username');
    await pageFixtures.page.locator(this.Elements.user_loc).fill(username);
    await pageFixtures.page.locator(this.Elements.pass_loc).fill(password);
    await pageFixtures.page.locator(this.Elements.sub_loc).click();
  }

  async getPageTitle(): Promise<string> {
    return await pageFixtures.page.title();
  }
}
