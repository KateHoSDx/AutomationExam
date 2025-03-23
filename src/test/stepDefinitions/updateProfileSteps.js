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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const pageFixtures_1 = require("../Utils/pageFixtures");
const loginPage_1 = require("../pages/loginPage");
const profilePage_1 = require("../pages/profilePage");
const profileData_1 = require("../testData/profileData");
const path_1 = __importDefault(require("path"));
const loginPage = new loginPage_1.LoginPage();
const profilePage = new profilePage_1.ProfilePage();
let sentRequestTime = "";
let eValidator = "";
const profileData = profileData_1.ProfileData.QA;
(0, cucumber_1.Then)("user profile page is displayed", { timeout: 15000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        let actualUsername = yield profilePage.getUserName();
        (0, test_1.expect)(actualUsername.trim()).toBeTruthy();
    });
});
(0, cucumber_1.When)("user go to Education, Certifications and clicks on Add button", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.goToCertificate();
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
    });
});
(0, cucumber_1.Then)("a popup for user to upload his certificate is displayed", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        let actualtitle = yield profilePage.getAddPopupTitle();
        (0, test_1.expect)(actualtitle).toBe(profileData.eCertificationTitle);
    });
});
(0, cucumber_1.When)("user select the type of certificate, choose a file, enter an Effective date and click on submit button", { timeout: 15000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        yield profilePage.clickOnAddButton();
        yield profilePage.selectCertificate();
        const filePath = path_1.default.resolve(process.cwd(), profileData.testCertificationPath);
        yield profilePage.uploadFile(filePath);
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        yield profilePage.setEffectiveDate(profileData.testEffectiveDate);
        yield profilePage.submitCertificate();
        sentRequestTime = yield profilePage.getCurrentSubmitionTime();
        //
    });
});
(0, cucumber_1.Then)("a notification popup is displayed", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let currentpopuptext = yield profilePage.getPopupText();
        let username = yield profilePage.getUserName();
        switch (username) {
            case profileData.eEmpUsername:
                (0, test_1.expect)(currentpopuptext).toBe(profileData.eEmpPopupMsg);
                break;
            case profileData.eManPopupMsg:
                (0, test_1.expect)(currentpopuptext).toBe(profileData.eManPopupMsg);
                break;
            case profileData.eHrPopupMsg:
                (0, test_1.expect)(currentpopuptext).toBe(profileData.eHrPopupMsg);
                break;
            default:
                throw new Error(`username "${username}" is not part of tet data`);
        }
    });
});
(0, cucumber_1.Then)("a notification message is displayed", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let currentNotificationMsg = yield profilePage.getNotificationMessage();
        (0, test_1.expect)(currentNotificationMsg).toBe(profileData.eNotificationMsg);
    });
});
(0, cucumber_1.When)("user go to task list", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        yield profilePage.goToTaskList();
    });
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
(0, cucumber_1.Then)("the request is displayed in the user task list", { timeout: 10000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixtures_1.pageFixtures.page.waitForLoadState("networkidle");
        // const taskDetails = await profilePage.getFirstTaskDetails();
        yield pageFixtures_1.pageFixtures.page.waitForTimeout(3000);
        //const actualTaskType = await profilePage.returnFirstTaskType();
        //expect(actualTaskType).toBe(profileData.eTaskType);
        //expect(taskDetails.details).toBe(profileData.eTaskDetails);
        //expect(taskDetails.requester).toBe(profileData.eEmpUsername);
        //expect(taskDetails.creationDate).toBe(sentRequestTime);
    });
});
(0, cucumber_1.When)("user clicks on the task", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.clicksOnFirstTask();
    });
});
(0, cucumber_1.Then)("the task details are displayed", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isPopoverVisible = yield profilePage.getTaskPopover();
        (0, test_1.expect)(isPopoverVisible).toBe(true);
    });
});
(0, cucumber_1.When)("user click on {string} button", function (action) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (action.toLowerCase()) {
            case "approve":
                yield profilePage.clickOnApproveButton();
                break;
            case "decline":
                yield profilePage.clickOnDeclineButton();
                break;
            default:
                throw new Error(`Action "${action}" is not recognized`);
        }
        eValidator = yield profilePage.getUserName();
    });
});
(0, cucumber_1.When)("user clicks on filter OTHER", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.clickOnFilterOther();
    });
});
(0, cucumber_1.Then)("the {string} task is displayed with correct status", function (action) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskDetails = yield profilePage.getFirstTaskDetails();
        (0, test_1.expect)(taskDetails.taskType).toBe(profileData.eTaskType);
        (0, test_1.expect)(taskDetails.details).toBe(profileData.eTaskDetails);
        (0, test_1.expect)(taskDetails.requester).toBe(profileData.eEmpUsername);
        (0, test_1.expect)(taskDetails.creationDate).toBe(sentRequestTime);
        switch (action.toLowerCase()) {
            case "approve":
                (0, test_1.expect)(taskDetails.status).toBe(profileData.eTaskApproveStatus);
                break;
            case "decline":
                (0, test_1.expect)(taskDetails.status).toBe(profileData.eTaskDeniedStatus);
                break;
            default:
                throw new Error(`Action "${action}" is not recognized`);
        }
    });
});
(0, cucumber_1.When)("user Hover on the notification icon", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.clickOnFilterOther();
    });
});
(0, cucumber_1.Then)("the {string} request notification is displayed", function (action) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstnotification = profilePage.getFirstNotificationText();
        switch (action.toLowerCase()) {
            case "approve":
                (0, test_1.expect)(firstnotification).toBe(profileData.eNotificationForApprovedrequest);
                break;
            case "decline":
                (0, test_1.expect)(firstnotification).toBe(profileData.eNotificationForDecliedRequest);
                break;
            default:
                throw new Error(`Action "${action}" is not recognized`);
        }
    });
});
(0, cucumber_1.When)("user clicks on the notification", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.clickOnTheFirstNotificationText();
    });
});
(0, cucumber_1.Then)("the {string} Notification details is displayed", function (action) {
    return __awaiter(this, void 0, void 0, function* () {
        let actualText = yield profilePage.getFirstNotificationDetails();
        switch (action.toLowerCase()) {
            case "approve":
                (0, test_1.expect)(actualText).toContain(profileData.eNotificationDetailsApproveBy + eValidator);
                break;
            case "decline":
                (0, test_1.expect)(actualText).toContain(profileData.eNotificationDetailsDeclineBy + eValidator);
                break;
            default:
                throw new Error(`Action "${action}" is not recognized`);
        }
    });
});
(0, cucumber_1.When)("user go to Education, Certifications", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield profilePage.goToCertificate();
    });
});
(0, cucumber_1.Then)("the Approve request of certification is in the correct state in user profile", function (action) {
    return __awaiter(this, void 0, void 0, function* () {
        let actualType = yield profilePage.getCertificateCardType();
        let actualFileName = yield profilePage.getCertificateCardFile();
        switch (action.toLowerCase()) {
            case "approve":
                (0, test_1.expect)(actualType, "Missing Type").toBeTruthy();
                (0, test_1.expect)(actualFileName, "Missing File name").toBeTruthy();
                (0, test_1.expect)(actualFileName).toBe(profileData.testCertificationFileName);
                break;
            case "decline":
                (0, test_1.expect)(actualType, "Type should be null").toBeNull();
                (0, test_1.expect)(actualFileName, "File name should be null").toBeNull();
                break;
            default:
                throw new Error(`Action "${action}" is not recognized`);
        }
    });
});
