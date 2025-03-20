Feature: Login and logout


    Scenario: Login with valid credentials
        Given user is on the login page
        When user enter email, password and click on submit button
            | email   | password   |
            | <email> | <password> |
        Then user profile page is displayed
            | username   |
            | <username> |

    Scenario: Logout
        Given user is on the profile page
        When user clicks on the logout button
        Then user is redirected on the login page

        Examples:
            | email             | password  | username    |
            | KhoTestEmp@gp.com | autoss#12 | KhoTest Emp |
            | KhoTestMan@gp.com | autoss#12 | KhoTest Man |
            | KhoTestHr@gp.com  | autoss#12 | KhoTest Hr  |


