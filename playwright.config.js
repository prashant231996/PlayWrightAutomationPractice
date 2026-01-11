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
  /* Prallel Test Execution
  By default play wright support parallel execution of test cases.
  And it provides 5 workes to process tests, like by default 5 test files were choose for parallel execution.
  We can configure workers number via workers property.
   PARALLEL EXECUTION==> It will execute test files prallalely, but test cases present in test files are still 
   executed in order only.
  */
  //workers:3,
  /* Run Tests cases present in Test files in Parallel mode==>
    This we can configure using  fullyParallel property by setting its value to true*/
  fullyParallel:false,
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
    screenshot: 'only-on-failure',
    /*video==>It will usefull to take video of test case execution*/ 
    video:"off",
     //Below key value is help to handle SSL Certificate error pop pups/window
    //If we set ignoreHTTPSErrors as true it will auto accept it.
    ignoreHTTPSErrors:true,
    //In permissions below basically we are to allow geolocations, or it handle geolocation pop pups
    permissions:['geolocation','notifications']
  },
});

