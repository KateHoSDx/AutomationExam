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

Then("user profile page is displayed", async function () {
  await pageFixtures.page.waitForLoadState("networkidle");
  let actualUsername = await profilePage.getUserName();
  expect(actualUsername.trim()).toBeTruthy();
});

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
  "user select the type of certificate, choose a file, enter an Effective date and click on submit button",
  async function () {
    await profilePage.selectCertificate();
    //await pageFixtures.page.waitForLoadState("networkidle");
    await profilePage.uploadFile(profileData.testCertificationPath);
    await profilePage.setEffectiveDate("");
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
      expect(currentpopuptext).toEqual(profileData.eEmpPopupMsg);
      break;

    case profileData.eManPopupMsg:
      expect(currentpopuptext).toEqual(profileData.eManPopupMsg);
      break;

    case profileData.eHrPopupMsg:
      expect(currentpopuptext).toEqual(profileData.eHrPopupMsg);
      break;

    default:
      throw new Error(`username "${username}" is not part of tet data`);
  }
});

Then("a notification message is displayed", async function () {
  let currentNotificationMsg = await profilePage.getNotificationMessage();
  expect(currentNotificationMsg).toEqual(profileData.eNotificationMsg);
});

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

Then("the request is displayed in the user task list", async function () {
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
