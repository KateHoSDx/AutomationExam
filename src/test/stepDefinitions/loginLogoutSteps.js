"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const pageFixtures_1 = require("../Utils/pageFixtures");
const loginPage_1 = require("../pages/loginPage");
const profilePage_1 = require("../pages/profilePage");
const loginPage = new loginPage_1.LoginPage();
const profilePage = new profilePage_1.ProfilePage();
(0, cucumber_1.Given)("user is on the login page", { timeout: 20000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield loginPage.goTo();
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        yield loginPage.waitForLoginFormToBeVisible();
    });
});
(0, cucumber_1.When)("user enter email, password and click on submit button", function (dataTable) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = dataTable.raw()[1][0];
        const password = dataTable.raw()[1][1];
        // Write code here that turns the phrase above into concrete actions
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        yield loginPage.enterCredentialsAndSubmit(email, password);
    });
});
//Logout scenario
(0, cucumber_1.Given)("user is on the profile page", function () {
    return __awaiter(this, void 0, void 0, function* () {
        (0, test_1.expect)(yield profilePage.getUserName()).not.toEqual("");
    });
});
(0, cucumber_1.When)("user clicks on the logout button", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.clickOnProfile();
        //await pageFixtures.page.waitForLoadState("networkidle");
        yield profilePage.clickOnLogoutButton();
        //
    });
});
(0, cucumber_1.Then)("user is redirected on the login page", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        let title = yield loginPage.getPageTitle();
        (0, test_1.expect)(title).toEqual("Sign in to globalsolutions-reference");
    });
});
