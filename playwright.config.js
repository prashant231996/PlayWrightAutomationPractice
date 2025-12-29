// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { dot } from 'node:test/reporters';

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
  timeout:30000,
  /*Giving time out for assertions*/
  expect:{
     timeout:10000
  },
  reporter:'html',
  /*Support Of adding multiple built in reporters*/
  /* reporter:[
    ['list'],
    ['line'],
    ['dot'],
    ['html'],
    ['json', { outputFile: 'results.json' }],
    ['junit', { outputFile: 'results.xml' }]
   ],*/
   // Give failing tests 1 retry attempts Or just rerun test once or one more time if test failed
  retries: 1,
  use: {
    //Default browser on which test will run
    browserName :'chromium',
    //Define do you want to execute in headed or headless mode
    headless:true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    /* trace ==> It will log all the traces in zip file that you can upload in trace viewer and anylyse all
    actions performed by automation script*/
    /*retain-on-failure ==> It will return the traces only in case of failure*/
    trace: "retain-on-failure",
    /* screenshot==> It will take scrrenshot of each and every step */
    screenshot: 'on',
    /*video==>It will usefull to take video of test case execution*/ 
    video:"retain-on-failure"
  },
});

