//store expected values and test data for the page, all expected values starts with "e"
export const ProfileData = {
  QA: {
    //Usernames per role
    eEmpUsername: "KhoTest Emp",
    eManUsername: "KhoTest Man",
    eHrUsername: "KhoTest Hr",
    //eValidator: "KhoTest Hr",
    //Employee send request popup message
    eHrPopupMsg: "Your successfully completed the task.",
    eManPopupMsg: "Your successfully completed the task.",
    eEmpPopupMsg: " Your request was recorded. ",
    eNotificationMsg: "Your request is in the process of being validated.",
    //certification add popup title
    eCertificationTitle: " Certifications ",
    testCertificationPath: "src/test/testData/certif001.txt",
    testCertificationFileName: "certif001.txt",
    testEffectiveDate: "2025-03-21",
    //Task expect results
    eTaskType: "Update personal info",
    eTaskDetails: "Certifications",
    eTaskApproveStatus: "VALIDATED",
    eTaskDeniedStatus: "REJECTED",

    eNotificationForDecliedRequest:
      "Changes in Certifications for KhoTest Emp were declined",
    eNotificationForApprovedrequest:
      "Changes in Certifications for KhoTest Emp were approved",
    eNotificationDetailsApproveBy: "The request was approved by ",
    eNotificationDetailsDeclineBy: "The request was declined by ",
  },
};
