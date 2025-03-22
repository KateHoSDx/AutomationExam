import { Given, When, Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";
import { LoginPage } from "../pages/loginPage";
import { ProfilePage } from "../pages/profilePage";
import { ProfileData } from "../testData/profileData";

import path from "path";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();
let sentRequestTime = "";
let eValidator = "";
const profileData = ProfileData.QA;

Then("user profile page is displayed", { timeout: 15000 }, async function () {
  await pageFixtures.page.waitForLoadState("networkidle");
  let actualUsername = await profilePage.getUserName();
  expect(actualUsername.trim()).toBeTruthy();
});

When(
  "user go to Education, Certifications and clicks on Add button",
  async function () {
    await profilePage.goToCertificate();
    await pageFixtures.page.waitForLoadState("networkidle");
  }
);

Then(
  "a popup for user to upload his certificate is displayed",
  async function () {
    await pageFixtures.page.waitForLoadState("networkidle");
    let actualtitle = await profilePage.getAddPopupTitle();
    expect(actualtitle).toBe(profileData.eCertificationTitle);
  }
);

When(
  "user select the type of certificate, choose a file, enter an Effective date and click on submit button",
  { timeout: 15000 },
  async function () {
    await pageFixtures.page.waitForLoadState("networkidle");
    await profilePage.clickOnAddButton();
    await profilePage.selectCertificate();
    const filePath = path.resolve(
      process.cwd(),
      profileData.testCertificationPath
    );
    await profilePage.uploadFile(filePath);
    await pageFixtures.page.waitForLoadState("networkidle");
    await profilePage.setEffectiveDate(profileData.testEffectiveDate);
    await profilePage.submitCertificate();
    sentRequestTime = await profilePage.getCurrentSubmitionTime();
    //
  }
);

Then("a notification popup is displayed", async function () {
  let currentpopuptext = await profilePage.getPopupText();
  let username = await profilePage.getUserName();
  switch (username) {
    case profileData.eEmpUsername:
      expect(currentpopuptext).toBe(profileData.eEmpPopupMsg);
      break;

    case profileData.eManPopupMsg:
      expect(currentpopuptext).toBe(profileData.eManPopupMsg);
      break;

    case profileData.eHrPopupMsg:
      expect(currentpopuptext).toBe(profileData.eHrPopupMsg);
      break;

    default:
      throw new Error(`username "${username}" is not part of tet data`);
  }
});

Then("a notification message is displayed", async function () {
  let currentNotificationMsg = await profilePage.getNotificationMessage();
  expect(currentNotificationMsg).toBe(profileData.eNotificationMsg);
});

When("user go to task list", async function () {
  await pageFixtures.page.waitForLoadState("networkidle");
  await profilePage.goToTaskList();
});

/*Then(
  "the request is not displayed in the user task list",
  async function (dataTable) {
    const EmpName = dataTable.raw()[1][0];
    const takslist = await profilePage.getTaskList();
    expect(takslist, "Check submition reuest time is present").not.toContain(
      sentRequestTime
    );
  }
);*/

Then("the request is displayed in the user task list", async function () {
  await pageFixtures.page.waitForLoadState("networkidle");
  const taskDetails = await profilePage.getFirstTaskDetails();

  expect(taskDetails.taskType).toBe(profileData.eTaskType);
  expect(taskDetails.details).toBe(profileData.eTaskDetails);
  expect(taskDetails.requester).toBe(profileData.eEmpUsername);
  expect(taskDetails.creationDate).toBe(sentRequestTime);
});

When("user clicks on the task", async function () {
  await profilePage.clicksOnFirstTask();
});

Then("the task details are displayed", async function () {
  const isPopoverVisible = await profilePage.getTaskPopover();
  expect(isPopoverVisible).toBe(true);
});

When("user click on {string} button", async function (action: string) {
  switch (action.toLowerCase()) {
    case "approve":
      await profilePage.clickOnApproveButton();
      break;

    case "decline":
      await profilePage.clickOnDeclineButton();
      break;

    default:
      throw new Error(`Action "${action}" is not recognized`);
  }
  eValidator = await profilePage.getUserName();
});
When("user clicks on filter OTHER", async function () {
  await profilePage.clickOnFilterOther();
});

Then(
  "the {string} task is displayed with correct status",
  async function (action: string) {
    const taskDetails = await profilePage.getFirstTaskDetails();

    expect(taskDetails.taskType).toBe(profileData.eTaskType);
    expect(taskDetails.details).toBe(profileData.eTaskDetails);
    expect(taskDetails.requester).toBe(profileData.eEmpUsername);
    expect(taskDetails.creationDate).toBe(sentRequestTime);
    switch (action.toLowerCase()) {
      case "approve":
        expect(taskDetails.status).toBe(profileData.eTaskApproveStatus);
        break;

      case "decline":
        expect(taskDetails.status).toBe(profileData.eTaskDeniedStatus);
        break;

      default:
        throw new Error(`Action "${action}" is not recognized`);
    }
  }
);

When("user Hover on the notification icon", async function () {
  await profilePage.clickOnFilterOther();
});

Then(
  "the {string} request notification is displayed",
  async function (action: string) {
    const firstnotification = profilePage.getFirstNotificationText();
    switch (action.toLowerCase()) {
      case "approve":
        expect(firstnotification).toBe(
          profileData.eNotificationForApprovedrequest
        );
        break;

      case "decline":
        expect(firstnotification).toBe(
          profileData.eNotificationForDecliedRequest
        );
        break;

      default:
        throw new Error(`Action "${action}" is not recognized`);
    }
  }
);

When("user clicks on the notification", async function () {
  await profilePage.clickOnTheFirstNotificationText();
});

Then(
  "the {string} Notification details is displayed",
  async function (action: string) {
    let actualText = await profilePage.getFirstNotificationDetails();
    switch (action.toLowerCase()) {
      case "approve":
        expect(actualText).toContain(
          profileData.eNotificationDetailsApproveBy + eValidator
        );
        break;

      case "decline":
        expect(actualText).toContain(
          profileData.eNotificationDetailsDeclineBy + eValidator
        );
        break;

      default:
        throw new Error(`Action "${action}" is not recognized`);
    }
  }
);

When("user go to Education, Certifications", async function () {
  await profilePage.goToCertificate();
});

Then(
  "the Approve request of certification is in the correct state in user profile",
  async function (action: string) {
    let actualType = await profilePage.getCertificateCardType();
    let actualFileName = await profilePage.getCertificateCardFile();
    switch (action.toLowerCase()) {
      case "approve":
        expect(actualType, "Missing Type").toBeTruthy();
        expect(actualFileName, "Missing File name").toBeTruthy();
        expect(actualFileName).toBe(profileData.testCertificationFileName);
        break;

      case "decline":
        expect(actualType, "Type should be null").toBeNull();
        expect(actualFileName, "File name should be null").toBeNull();

        break;

      default:
        throw new Error(`Action "${action}" is not recognized`);
    }
  }
);
