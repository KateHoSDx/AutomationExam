Feature: UpdateProfile

    @PositivetTest
    Scenario: Validate/Reject certification Update request from employee
        Given user is on the login page
        When user enter email, password and click on submit button
            | email             | password  |
            | KhoTestEmp@gp.com | autoss#12 |
        Then user profile page is displayed
        When user go to Education, Certifications and clicks on Add button
        Then a popup for user to upload his certificate is displayed
        When user select the type of certificate, choose a file, enter an Effective date and click on submit button
        Then a notification popup is displayed
        And a notification message is displayed
        When user clicks on the logout button
        And user enter email, password and click on submit button
            | email             | password  |
            | KhoTestMan@gp.com | autoss#12 |
        When user go to task list
        Then the request is displayed in the user task list
        When user clicks on the task
        Then the task details are displayed
        When user click on "<Action>" button
        Then a notification popup is displayed
        When user clicks on filter OTHER
        Then the "<Action>" task is displayed with correct status
            # When user clicks on the logout button
            # And user enter email, password and click on submit button
            | email             | password  |
            | KhoTestMan@gp.com | autoss#12 |
        # And Hover on the notification icon
        # Then the "<Action>" request notification is displayed
        #When user clicks on the notification
        #Then Notification details is displayed
        # When user clicks on the logout button
        # And user enter email, password and click on submit button
        #    | email             | password  |
        #    | KhoTestEmp@gp.com | autoss#12 |
        #Then user profile page is displayed
        #when user Hover on the notification icon
        # Then the "<Action>" request notification is displayed
        #When user clicks on the notification
        #Then Notification details is displayed
        #When user go to Education, Certifications
        #Then <Action> request of certification is in the correct state

        Examples:
            | Action  |
            | Approve |