import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: "html",

  use: {
    baseURL: "https://demo.guru99.com/test/newtours/",
    headless: false,
    launchOptions: { slowMo: 1000 },
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  webServer: {
    command: "npm start",
    url: "http://localhost:3000/",
    reuseExistingServer: true,
  },
});
