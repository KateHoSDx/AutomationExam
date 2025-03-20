await page.goto(
  "https://signon-acc1.globepayroll.net/auth/realms/globalsolutions-reference/protocol/openid-connect/auth?client_id=GPFRONT&redirect_uri=https%3A%2F%2Fglobalsolutions-reference.gpi-test.globepayroll.net%2Fui%2F%23%2Fdashboard&state=9eb3e8dc-8f06-44b2-8353-592ff2b4d1c8&response_mode=fragment&response_type=code&scope=openid&nonce=d296b43b-f44c-42a8-a619-c21ac7ed03c2"
);
await page.getByRole("textbox", { name: "Username or email" }).click();
await page
  .getByRole("textbox", { name: "Username or email" })
  .fill("KhoTestEmp@gp.com");
await page.getByRole("textbox", { name: "Password" }).click();
await page.getByRole("textbox", { name: "Password" }).click();
await page.getByRole("textbox", { name: "Password" }).fill("autoss#12");
await page.getByRole("button", { name: "Sign In" }).click();
await expect(page.locator("gp-navbar")).toContainText("KhoTest Emp");
await page.locator("#ess-menu").click();
await page.locator("#ess-personal-info-menu").click();
await page.locator("a").filter({ hasText: "Education" }).click();
await page.getByText("Certifications").click();
await page.getByRole("button", { name: " Add" }).click();
await page.locator("ng-select span").first().click();
await page.getByRole("link", { name: "Certification 1 (Driving" }).click();
await page.getByRole("textbox", { name: " Choose or drop a file" }).click();
await page
  .getByRole("textbox", { name: " Choose or drop a file" })
  .setInputFiles("certif001.txt");
await page.getByRole("textbox", { name: "YYYY-MM-DD" }).click();
await page.locator("datepicker-input i").click();
await page.getByRole("button", { name: "15" }).click();
await page.getByRole("button", { name: "Submit" }).click();
await expect(page.getByLabel("Your request was recorded.")).toContainText(
  "Your request was recorded."
);
await page.getByText("Your request is in the").click();
await expect(page.locator("gp-contract-data")).toContainText(
  "Your request is in the process of being validated."
);
await page
  .locator("span")
  .filter({ hasText: "KhoTest Emp Last connection" })
  .first()
  .click();
await page.getByText("Sign out").click();
await page.getByRole("textbox", { name: "Username or email" }).click();
