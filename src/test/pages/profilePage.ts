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
    certification_list: "//input[@class='form-control ui-select-search']",
    certificationDriverLicence:
      "//div[@test-id='Certification 1 (Driving licence)']",
    certification_upl: "//input[@test-id='CertificationScannedCopy']",
    certificationEffectiveDate_txt: "//input[@placeholder='YYYY-MM-DD']",
    certificationSubmit_btn: "//button[text()=' Submit ']",
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

  async selectCertificate() {
    await pageFixtures.page.locator(this.Elements.certification_list).click();
    await pageFixtures.page
      .locator(this.Elements.certificationDriverLicence)
      .click();
  }

  async uploadFile(filePath: string) {
    await pageFixtures.page
      .locator(this.Elements.certification_upl)
      .setInputFiles(filePath);
  }

  async setEffectiveDate(effectiveDate: string) {
    await pageFixtures.page
      .locator(this.Elements.certificationEffectiveDate_txt)
      .fill(effectiveDate);
  }

  async submitCertificate() {
    await pageFixtures.page
      .locator(this.Elements.certificationSubmit_btn)
      .click();
  }

  async getCurrentSubmitionTime(): Promise<string> {
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return formattedTime;
  }
}
