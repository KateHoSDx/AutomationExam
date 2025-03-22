import { Given, When, Then } from "@cucumber/cucumber";
import { Page, expect } from "@playwright/test";
import { pageFixtures } from "../Utils/pageFixtures";
import { LoginPage } from "../pages/loginPage";
import { ProfilePage } from "../pages/profilePage";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();

Given("user is on the login page", { timeout: 20000 }, async function () {
  await loginPage.goTo();
  await pageFixtures.page.waitForLoadState("networkidle");
  await loginPage.waitForLoginFormToBeVisible();
});

When(
  "user enter email, password and click on submit button",
  async function (dataTable) {
    const email = dataTable.raw()[1][0];
    const password = dataTable.raw()[1][1];
    // Write code here that turns the phrase above into concrete actions
    await pageFixtures.page.waitForLoadState("networkidle");
    await loginPage.enterCredentialsAndSubmit(email, password);
  }
);

//Logout scenario
Given("user is on the profile page", async function () {
  expect(await profilePage.getUserName()).not.toEqual("");
});

When("user clicks on the logout button", async function () {
  await profilePage.clickOnProfile();
  //await pageFixtures.page.waitForLoadState("networkidle");
  await profilePage.clickOnLogoutButton();
  //
});

Then("user is redirected on the login page", async function () {
  await pageFixtures.page.waitForLoadState("networkidle");
  let title = await loginPage.getPageTitle();
  expect(title).toEqual("Sign in to globalsolutions-reference");
});
