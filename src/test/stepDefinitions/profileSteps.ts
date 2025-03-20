import { Given, When, Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";
import { LoginPage } from "../pages/loginPage";
import { ProfilePage } from "../pages/profilePage";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();
let sentRequestTime = "";

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
    expect(actualtitle).toEqual(" Certifications ");
  }
);

When(
  "user select the type of certificate, choose a file, enter an Effective date and click on submit button",
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
  async function () {}
);
