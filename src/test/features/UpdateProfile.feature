Feature: UpdateProfile

    @PositivetTest
    Scenario: Validate/Reject certification Update request from employee
        Given user is on the login page
        When user enter email, password and click on submit button
            | email             | password  |
            | KhoTestEmp@gp.com | autoss#12 |
        Then user profile page is displayed
            | username       |
            | <EmployeeName> |
        When user go to Education, Certifications and clicks on Add button
        Then a popup for user to upload his certificate is displayed
        When user select the type of certificate, choose a file "<FilePath>", enter an Effective date and click on submit button
        Then a notification popup is displayed and a notification message is displayed
        When user clicks on the logout button
        And user enter email, password and click on submit button
            | email            | password  |
            | KhoTestMangp.com | autoss#12 |
        When user go to task list
        Then the request is displayed in the user task list
            | EmpoyeeName    |
            | <EmployeeName> |
        When user clicks on the task
        Then the task details are displayed
        When user click on "<Action>" button
        # Then a notification popup is displayed
        # When Hr refresh the page, go to task list with filter other
        # Then the Approved task is displayed with status Validated
        # When HR logout and Employee login
        # And Hover on the notification icon
        # Then the approved request message is displayed
        # When employee click on the


        Examples:
            | EmployeeName | Action  |
            | KhoTest Emp  | Approve |