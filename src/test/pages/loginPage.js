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
exports.LoginPage = void 0;
const pageFixtures_1 = require("../Utils/pageFixtures");
class LoginPage {
    constructor() {
        this.Elements = {
            user_loc: "//input[@id='username']",
            pass_loc: "//input[@id='password']",
            sub_loc: "//input[@id='kc-login']",
            username_txt: "//gp-navbar//li[3]//span[@class='block l-h-1x _500 text-capitalize nav-user-name']",
        };
    }
    goTo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.goto("https://globalsolutions-reference.gpi-test.globepayroll.net/ui/#/dashboard");
            yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        });
    }
    waitForLoginFormToBeVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            const loginButton = pageFixtures_1.pageFixtures.page.locator(this.Elements.sub_loc); // Example: adjust for your page
            yield loginButton.waitFor({ state: "visible", timeout: 20000 });
        });
    }
    enterUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.user_loc).fill(username);
        });
    }
    enterPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.pass_loc).fill(password);
        });
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.sub_loc).click();
        });
    }
    enterCredentialsAndSubmit(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //await enterUsername('username');
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.user_loc).fill(username);
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.pass_loc).fill(password);
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.sub_loc).click();
        });
    }
    getPageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pageFixtures_1.pageFixtures.page.title();
        });
    }
}
exports.LoginPage = LoginPage;
