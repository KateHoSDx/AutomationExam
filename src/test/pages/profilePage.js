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
exports.ProfilePage = void 0;
const pageFixtures_1 = require("../Utils/pageFixtures");
class ProfilePage {
    constructor() {
        this.Elements = {
            username_txt: "//gp-navbar//li[3]//span[@class='block l-h-1x _500 text-capitalize nav-user-name']",
            logout_btn: "//gp-navbar//a[text()=' Sign out ']",
            mySpace_a: "#ess-menu",
            persoInfo_a: "#ess-personal-info-menu",
            civilIdentification_a: "//gp-contract-data-group-menu//a/span[text()='Civil identification']",
            education_a: "//gp-contract-data-group-menu//span[text()='Education']",
            certification_a: "//gp-contract-data-group-menu//span[text()='Certifications']",
            add_btn: "//gp-contract-data//span[text()='Add']",
            add_pu: "//gp-modal[@gp-modal='edit-card']//div[@class='modal-content']",
            add_til: "//gp-modal[@gp-modal='edit-card']//div[@class='gp-modal-title']",
            certification_list: "//div[@class='ui-select-match']/span", //"//input[@class='form-control ui-select-search']",
            certificationDriverLicence: "//div[@test-id='Certification 1 (Driving licence)']",
            certification_upl: "//input[@test-id='CertificationScannedCopy']",
            certificationEffectiveDate_txt: "//input[@placeholder='YYYY-MM-DD']",
            certificationSubmit_btn: "//button[text()=' Submit ']",
            popupMsg: "//div[@id='toast-container']",
            notificationMessage: "//gp-contract-data//div[@class='col-right--warning ng-star-inserted']//span",
            taskList: "#my-tasks-menu",
            taskListOther: "//button[@test-id='status-filter-other']",
            taskContainer: "tbody",
            firstTaskType: "//gp-workflows//gp-table//table//tr[1]/td[1]",
            firstTaskDetails: "//gp-table//tbody/tr[1]/td[2]",
            firstTaskRequester: "//gp-table//tbody/tr[1]/td[3]//span[1]",
            firstTaskStatus: "//gp-table//tbody//tr[1]/td[5]/div[1]/span[1]",
            firstTaskCreationDate: "//gp-table//tbody/tr[1]/td[6]",
            taskPopover: "//div[@class='task-popover-details'] ",
            taskApprove_btn: "//button[@test-id=' Approve ']",
            taskDecline_btn: "//button[@test-id=' Decline ']",
            notificationIcon: "//gp-navbar//ul/li[1]/a/em",
            firstNotification: "//gp-communications-card/div[1]/div[1]/div[2]/div/span",
            firstNotificationDetails: "//gp-notification-details//div[@test-id='notification-body-click']",
            certificateCardType: "//gp-contract-data//gp-contract-data-card[1]//div[@class='box-body']//div[1]/div/span",
            certificateCardFile: "//gp-contract-data//gp-contract-data-card[1]//div[@class='box-body']//div[2]/div/span",
        };
    }
    getUserName() {
        return __awaiter(this, void 0, void 0, function* () {
            let username = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.username_txt)
                .textContent();
            return username !== null && username !== void 0 ? username : " ";
        });
    }
    clickOnProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.username_txt).click();
        });
    }
    clickOnLogoutButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.logout_btn).click();
        });
    }
    goToCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.mySpace_a).click();
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.persoInfo_a).click();
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.civilIdentification_a);
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.education_a).click();
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.certification_a).click();
        });
    }
    clickOnAddButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.add_btn).click();
        });
    }
    getAddPopupTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            let addTitle = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.add_til)
                .textContent();
            return addTitle !== null && addTitle !== void 0 ? addTitle : "";
        });
    }
    selectCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.certification_list).focus();
            //await pageFixtures.page.locator(this.Elements.certification_list).fill("Ce");
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.certification_list).click();
            yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.certificationDriverLicence)
                .click();
        });
    }
    uploadFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.certification_upl)
                .setInputFiles(filePath);
        });
    }
    setEffectiveDate(effectiveDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.certificationEffectiveDate_txt)
                .fill(effectiveDate);
        });
    }
    submitCertificate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.certificationSubmit_btn)
                .click();
        });
    }
    getCurrentSubmitionTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            return formattedTime;
        });
    }
    getPopupText() {
        return __awaiter(this, void 0, void 0, function* () {
            let message = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.popupMsg)
                .textContent();
            return message !== null && message !== void 0 ? message : "";
        });
    }
    getNotificationMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const notif = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.notificationMessage)
                .textContent();
            return notif !== null && notif !== void 0 ? notif : "";
        });
    }
    goToTaskList() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.taskList).click();
        });
    }
    getTaskList() {
        return __awaiter(this, void 0, void 0, function* () {
            let tasklist = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.taskList)
                .innerHTML();
            return tasklist !== null && tasklist !== void 0 ? tasklist : "";
        });
    }
    clicksOnFirstTask() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.firstTaskDetails).click();
        });
    }
    returnFirstTaskType() {
        return __awaiter(this, void 0, void 0, function* () {
            const locator = pageFixtures_1.pageFixtures.page.locator(this.Elements.firstTaskType);
            yield pageFixtures_1.pageFixtures.page.waitForTimeout(3000);
            const tType = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstTaskType)
                .textContent();
            return tType !== null && tType !== void 0 ? tType : "";
        });
    }
    getFirstTaskDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            let tType = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstTaskType)
                .textContent();
            let tDetails = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstTaskDetails)
                .textContent();
            let tRequester = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstTaskRequester)
                .textContent();
            let creationDate = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstTaskCreationDate)
                .textContent();
            let tStatus = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstTaskStatus)
                .textContent();
            return {
                taskType: tType !== null && tType !== void 0 ? tType : "",
                details: tDetails !== null && tDetails !== void 0 ? tDetails : "",
                requester: tRequester !== null && tRequester !== void 0 ? tRequester : "",
                creationDate: creationDate !== null && creationDate !== void 0 ? creationDate : "",
                status: tStatus !== null && tStatus !== void 0 ? tStatus : "",
            };
        });
    }
    getTaskPopover() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.taskPopover)
                .isVisible();
        });
    }
    clickOnApproveButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.taskApprove_btn).click();
        });
    }
    clickOnDeclineButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.taskDecline_btn).click();
        });
    }
    clickOnFilterOther() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.taskListOther).click();
        });
    }
    hoverOnNotificationIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.notificationIcon).hover();
        });
    }
    clickOnTheFirstNotificationText() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page.locator(this.Elements.firstNotification).click();
        });
    }
    getFirstNotificationText() {
        return __awaiter(this, void 0, void 0, function* () {
            let firstNotificationText = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstNotification)
                .textContent();
            return firstNotificationText !== null && firstNotificationText !== void 0 ? firstNotificationText : "";
        });
    }
    getFirstNotificationDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.firstNotificationDetails)
                .textContent();
        });
    }
    getCertificateCardType() {
        return __awaiter(this, void 0, void 0, function* () {
            let certifType = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.certificateCardType)
                .textContent();
            return certifType !== null && certifType !== void 0 ? certifType : "";
        });
    }
    getCertificateCardFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let certifFile = yield pageFixtures_1.pageFixtures.page
                .locator(this.Elements.certificateCardFile)
                .textContent();
            return certifFile !== null && certifFile !== void 0 ? certifFile : "";
        });
    }
}
exports.ProfilePage = ProfilePage;
