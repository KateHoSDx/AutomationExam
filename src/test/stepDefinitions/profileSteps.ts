import { Given, When, Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";
import { LoginPage } from "../pages/loginPage";
import { ProfilePage } from "../pages/profilePage";
import { ProfileData } from "../testData/profileData";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();
let sentRequestTime = "";
const profileData = ProfileData.QA;

When(
  "user go to Education, Certifications and clicks on Add button",
  async function () {
    await profilePage.clickOnProfile();
    //await pageFixtures.page.waitForLoadState("networkidle");
    await profilePage.clickOnLogoutButton();
    //
  }
);

Then(
  "a popup for user to upload his certificate is displayed",
  async function () {
    await pageFixtures.page.waitForLoadState("networkidle");
    let actualtitle = await profilePage.getAddPopupTitle();
    expect(actualtitle).toEqual(profileData.eCertificationTitle);
  }
);

When(
  "user select the type of certificate, choose a file {string}, enter an Effective date and click on submit button",
  async function () {
    await profilePage.selectCertificate();
    //await pageFixtures.page.waitForLoadState("networkidle");
    await profilePage.uploadFile("certif001.txt");
    await profilePage.setEffectiveDate("");
    await profilePage.submitCertificate();
    sentRequestTime = await profilePage.getCurrentSubmitionTime();
    //
  }
);

Then(
  "a notification popup is displayed and a notification message is displayed",
  async function () {
    let currentpopuptext = await profilePage.getDialogText();
    expect(currentpopuptext).toEqual(profileData.eEmpPopupMsg);

    let currentNotificationMsg = await profilePage.getNotificationMessage();
    expect(currentNotificationMsg).toEqual(profileData.eNotificationMsg);
  }
);

When("user go to task list", async function () {
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

Then(
  "the request is displayed in the user task list",
  async function (dataTable) {
    const eEmpName = dataTable.raw()[1][0];
    const taskDetails = await profilePage.getFirstTaskDetails();

    expect(taskDetails.taskType).toBe(profileData.eTaskType);
    expect(taskDetails.details).toBe(profileData.eTaskDetails);
    expect(taskDetails.requester).toBe(eEmpName);
    expect(taskDetails.creationDate).toBe(sentRequestTime);
  }
);

When("user clicks on the task", async function () {
  await profilePage.clicksOnFirstTask();
});

Then("the task details are displayed", async function (dataTable) {
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
});
