import { Page, Locator } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";

export class ProfilePage {
  private Elements = {
    username_txt:
      "//gp-navbar//li[3]//span[@class='block l-h-1x _500 text-capitalize nav-user-name']",
    logout_btn: "//gp-navbar//a[text()=' Sign out ']",
    mySpace_a: "#ess-menu",
    persoInfo_a: "#ess-personal-info-menu",
    education_a: "//gp-contract-data-group-menu//span[text()='Education']",
    certification_a:
      "//gp-contract-data-group-menu//span[text()='Certifications']",
    add_btn: "//gp-contract-data//span[text()='Add']",
    add_pu: "//gp-modal[@gp-modal='edit-card']//div[@class='modal-content']",
    add_til: "//gp-modal[@gp-modal='edit-card']//div[@class='gp-modal-title']",
  };

  async getUserName(): Promise<string> {
    let username = await pageFixtures.page
      .locator(this.Elements.username_txt)
      .textContent();
    return username ?? "";
  }

  async clickOnProfile() {
    await pageFixtures.page.locator(this.Elements.username_txt).click();
  }

  async clickOnLogoutButton() {
    await pageFixtures.page.locator(this.Elements.logout_btn).click();
  }

  async goToCertificate() {
    await pageFixtures.page.locator(this.Elements.mySpace_a).click();
    await pageFixtures.page.locator(this.Elements.persoInfo_a).click();
    await pageFixtures.page.locator(this.Elements.education_a).click();
    await pageFixtures.page.locator(this.Elements.certification_a).click();
  }

  async clickOnAddButton() {
    await pageFixtures.page.locator(this.Elements.add_btn).click();
  }

  async getAddPopupTitle(): Promise<string> {
    let addTitle = await pageFixtures.page
      .locator(this.Elements.add_til)
      .textContent();
    return addTitle ?? "";
  }
}
