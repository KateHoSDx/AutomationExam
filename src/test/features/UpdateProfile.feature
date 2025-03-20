Feature: UpdateProfile

    Scenario: Approved Employee request for update
        Given user is on the login page
        When user enter email, password and click on submit button
            | email             | password  |
            | KhoTestEmp@gp.com | autoss#12 |
        Then user profile page is displayed
            | username    |
            | KhoTest Emp |
        When user go to Education, Certifications and clicks on Add button
        Then a popup for user to upload his certificate is displayed
        When user select the type of certificate, choose a file, enter an Effective date and click on submit button
        Then a notification popup is displayed and a notification message is displayed
#When user clicks on the logout button
#And user enter email, password and click on submit button
#   | email             | password  |
#    | KhoTestMan@gp.com | autoss#12 |
# And go to task list
# Then the profile update request is displayed in the "Manager" task list
# When user logout and "HR" login
# And go to task list
# Then the profile update request is displayed in the "Hr" task list
# When Hr clicks on the approve button
# Then a notification popup is displayed
# When Hr refresh the page, go to task list with filter other
# Then the Approved task is displayed with status Validated
# When HR logout and Employee login
# And Hover on the notification icon
# Then the approved request message is displayed
# When employee click on the
