// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { dot } from 'node:test/reporters';

/*
  CREATION OF CUSTOM CONFIGURATION FILE

  This is helpfull in case of running test scripts on cross browsers.
  This is helpfull to do multi browser testing.
  In this file we can configure different combination of browsers data under Projects.
  ==>CAMMAND TO RUN TEST CASES WITH RESPECTIVE PROJECT CONFIGURATION IS LIKE BELOW
  ==> npx playwright test Alerts.spec.js --config playwright.config1.js --project Safari
 **--config ==> It will redirect to custom config file, by default it takes playwright.config.js
 **--project ==> Here we need to mention project name, with which we want to run our test case
 ** IF WE NOT PROVIDE ANY PROJECT NAME IT WILL EXECUTE TEST CASES WITH ALL PROJECT DATA MENTIONED UNDER PROJECTS
*/

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
  /* Run Tests in file files in Parallel */
  //fullyParallel:false,
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
  //retries: 1,
  projects: [
    {
      name:'Safari',
       use: {
    //Default browser on which test will run
    browserName :'webkit',
    //Define do you want to execute in headed or headless mode
    headless:false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    /* trace ==> It will log all the traces in zip file that you can upload in trace viewer and anylyse all
    actions performed by automation script*/
    /*retain-on-failure ==> It will return the traces only in case of failure*/
    trace: "retain-on-failure",
    /* screenshot==> It will take scrrenshot of each and every step */
    screenshot: 'only-on-failure',
    /*video==>It will usefull to take video of test case execution*/ 
    video:"off",
    //Below key value is help to handle SSL Certificate error pop pups/window
    //If we set ignoreHTTPSErrors as true it will auto accept it.
    ignoreHTTPSErrors:true,
    //In permissions below basically we are to allow geolocations, or it handle geolocation pop pups
    permissions:['geolocation'],
    //Here we can mentione any mobile device name on which we want to run our test cases
    //...devices['iPhone 11 Pro']
  }
},
  {
    name: "Chrome",
    use: {
    //Default browser on which test will run
    browserName :'chromium',
    //Define do you want to execute in headed or headless mode
    headless:false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    /* trace ==> It will log all the traces in zip file that you can upload in trace viewer and anylyse all
    actions performed by automation script*/
    /*retain-on-failure ==> It will return the traces only in case of failure*/
    trace: "retain-on-failure",
    /* screenshot==> It will take scrrenshot of each and every step */
    screenshot: 'only-on-failure',
    /*video==>It will usefull to take video of test case execution*/ 
    video:"off",
    //Using viewport we can configure launched browser diementions
    //viewport: { width: 720, height: 720 }
  }
} 
  ]
 ,
});

