import { Page, Locator } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";

export class ProfilePage {
  private Elements = {
    username_txt:
      "//gp-navbar//li[3]//span[@class='block l-h-1x _500 text-capitalize nav-user-name']",
    logout_btn: "//gp-navbar//a[text()=' Sign out ']",
    mySpace_a: "#ess-menu",
    persoInfo_a: "#ess-personal-info-menu",
    civilIdentification_a:
      "//gp-contract-data-group-menu//a/span[text()='Civil identification']",
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
    popupMsg: "//div[@id='toast-container']",
    notificationMessage:
      "//gp-contract-data//div[@class='col-right--warning ng-star-inserted']//span",

    taskList: "#my-tasks-menu",
    taskListOther: "//button[@test-id='status-filter-other']",
    taskContainer: "tbody",
    firstTaskType: "//gp-table//tbody/tr[1]/td[1]",
    firstTaskDetails: "//gp-table//tbody/tr[1]/td[2]",
    firstTaskRequester: "//gp-table//tbody/tr[1]/td[3]//span[1]",
    firstTaskStatus: "//gp-table//tbody/tr[1]/td[5]//span",
    firstTaskCreationDate: "//gp-table//tbody/tr[1]/td[6]",
    taskPopover: "//div[@class='task-popover-details'] ",
    taskApprove_btn: "//button[@test-id=' Approve ']",
    taskDecline_btn: "//button[@test-id=' Decline ']",
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

  async getPopupText(): Promise<string> {
    let message = await pageFixtures.page
      .locator(this.Elements.popupMsg)
      .textContent();
    return message ?? "";
  }

  async getNotificationMessage(): Promise<string> {
    const notif = await pageFixtures.page
      .locator(this.Elements.notificationMessage)
      .textContent();
    return notif ?? "";
  }

  async goToTaskList() {
    await pageFixtures.page.locator(this.Elements.taskList).click();
  }

  async getTaskList(): Promise<string> {
    let tasklist = await pageFixtures.page
      .locator(this.Elements.taskList)
      .innerHTML();
    return tasklist ?? "";
  }

  async clicksOnFirstTask() {
    await pageFixtures.page.locator(this.Elements.firstTaskDetails).click();
  }

  async getFirstTaskDetails(): Promise<{
    taskType: string;
    details: string;
    requester: string;
    creationDate: string;
    status: string;
  }> {
    return {
      taskType:
        (await pageFixtures.page
          .locator(this.Elements.firstTaskType)
          .textContent()) ?? "",
      details:
        (await pageFixtures.page
          .locator(this.Elements.firstTaskDetails)
          .textContent()) ?? "",
      requester:
        (await pageFixtures.page
          .locator(this.Elements.firstTaskRequester)
          .textContent()) ?? "",
      creationDate:
        (await pageFixtures.page
          .locator(this.Elements.firstTaskCreationDate)
          .textContent()) ?? "",
      status:
        (await pageFixtures.page
          .locator(this.Elements.firstTaskStatus)
          .textContent()) ?? "",
    };
  }
  async getTaskPopover(): Promise<boolean> {
    return await pageFixtures.page
      .locator(this.Elements.taskPopover)
      .isVisible();
  }

  async clickOnApproveButton() {
    await pageFixtures.page.locator(this.Elements.taskApprove_btn).click();
  }

  async clickOnDeclineButton() {
    await pageFixtures.page.locator(this.Elements.taskDecline_btn).click();
  }

  async clickOnFilterOther() {
    await pageFixtures.page.locator(this.Elements.taskListOther).click();
  }
}
