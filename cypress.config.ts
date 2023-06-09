import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
  },
  
  video: false,
  screenshotOnRunFailure: false,
  retries: {
    runMode: 1,
    openMode: 1
  },
  env: {
    baseUrl: "https://restful-booker.herokuapp.com",
    username: "admin",
    password: "password123"
  },
});