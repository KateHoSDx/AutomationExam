await page.goto(
  "https://signon-acc1.globepayroll.net/auth/realms/globalsolutions-reference/protocol/openid-connect/auth?client_id=GPFRONT&redirect_uri=https%3A%2F%2Fglobalsolutions-reference.gpi-test.globepayroll.net%2Fui%2F%23%2Fdashboard&state=d3d4ea1b-d7e9-46c0-aed2-101cf0538af4&response_mode=fragment&response_type=code&scope=openid&nonce=b9f1f132-328b-462c-95d3-6bfd4d8c5bcb"
);
await page.getByRole("textbox", { name: "Username or email" }).click();
await page.getByRole("textbox", { name: "Username or email" }).click();
await page
  .getByRole("textbox", { name: "Username or email" })
  .fill("KhoTestEmp@gp.com");
await page
  .getByText(
    "Sign in to your account Username or email Password Forgot Password? Sign In Or"
  )
  .click();
await page.getByRole("textbox", { name: "Password" }).click();
await page.getByRole("textbox", { name: "Password" }).fill("autoss#12");
await page.getByRole("button", { name: "Sign In" }).click();
await page.locator("#ess-menu").click();
await page.locator("#ess-personal-info-menu").click();
await page
  .locator("a")
  .filter({ hasText: /^Personal information$/ })
  .click();
await page.locator("a").filter({ hasText: "Education" }).click();
await page.getByText("Certifications", { exact: true }).click();


  await page.locator('#my-tasks-menu').click();
  await expect(page.locator('tbody')).toContainText('Update personal info');
  await expect(page.locator('tbody')).toContainText('Certifications');
  await expect(page.locator('tbody')).toContainText('KhoTest Emp');
  await expect(page.locator('tbody')).toContainText('2025-03-21 09:27');
  await page.locator('td').first().click();
  await expect(page.locator('gp-form-descriptor-element')).toContainText('Certification 1 (Driving licence)');
  await expect(page.locator('gp-form-descriptor-element')).toContainText('credentials.txt');
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.getByRole('button', { name: 'OTHER' }).click();
  await expect(page.locator('tbody')).toContainText('Update personal info');
  await expect(page.locator('tbody')).toContainText('Certifications');
  await expect(page.locator('tbody')).toContainText('KhoTest Emp');
  await expect(page.locator('tbody')).toContainText('VALIDATED');
  await expect(page.locator('tbody')).toContainText('2025-03-21 09:27');
  await expect(page.locator('tbody')).toContainText('2025-03-21 09:27');
  await page.getByRole('cell', { name: 'Update personal info' }).first().click();
  await page.getByRole('button', { name: 'IN PROGRESS' }).click();
  await expect(page.locator('gp-communications-card')).toContainText('Changes in Certifications for KhoTest Emp were approved');
  await page.getByRole('link', { name: '' }).click();
  await page.getByText('Changes in Certifications for').nth(2).click();
  await expect(page.locator('gp-notification-details')).toContainText('KhoTest Emp has requested changes in Certifications block with effective date at 21.03.2025 as follows: - CertificationType: Certification 1 (Driving licence) - Scanned copy: credentials.txt The request was approved by KhoTest Hr');
  await page.getByText('Changes in Certifications for KhoTest Emp were approved').first().click();
  await expect(page.locator('gp-communications-card')).toContainText('Changes in Certifications for KhoTest Emp were approved');
  await expect(page.locator('gp-notification-details')).toContainText('KhoTest Emp has requested changes in Certifications block with effective date at 21.03.2025 as follows: - CertificationType: Certification 1 (Driving licence) - Scanned copy: credentials.txt The request was approved by KhoTest Hr');
  await page.locator('#ess-menu').click();
  await page.locator('#ess-personal-info-menu').click();
  await page.locator('a').filter({ hasText: 'Education' }).click();
  await page.getByText('Certifications', { exact: true }).click();
  await expect(page.locator('gp-contract-data')).toContainText('Certification 1 (Driving licence)');
  await expect(page.locator('gp-contract-data')).toContainText('certif001.txt');
   }

