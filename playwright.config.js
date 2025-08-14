// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //test directory from which tests will execute
  testDir: './tests',
  /*Explicitly adding timeout for each step(locating element,etc.)Default time out is 30 Sec*/
  timeout:40000,
  /*Giving time out for assertions*/
  expect:{
     timeout:40000
  },
  use: {
    //Default browser on which test will run
    browserName :'chromium',
    //Define do you want to execute in headed or headless mode
    headless:true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
});

