
## 🍓 STRAWBERRY QA

This project contains LOGIN and SIGNUP functionalities of Strawberry QA 

## Description

Using Playwright, we will create a test automation framework with the following features:

The Page Object Model pattern
Create Allure reports that include logs, report and screenshots

## Project Overview
  
The tests cover the following test cases:
- **Login Functionality**: Test that logs in with existing account and verifies successful login.
- **SignUp Functionality**: Test that signs up with new user and create the account and verifies field validation.


## Pre-requisites

As mentioned in the Readme.md file. 

## Installation

As mentioned in the Readme.md file.

## Running Tests

To run the application locally, run the command below

```bash
npm run dev
```
Now you can run the test using 

```bash
npm run test:e2e:headed 
```
(or)

```bash
npm run test:e2e
```
To run a specific test in headless mode , use the below.

```bash
npx playwright test tests/signUp/signUp.test.ts --headed
```

## Folder Structure

```
/pages
  - loginPage.ts     // objects and functions for login page
  - signUpFormPage.ts     // Objects and functions for sign up form page

/tests
  /login
    - login.test.ts   // Happy path and a commented error path test cases
  /signUp
    - signUp.test.ts  // Happy path , field validation and a commented error path test cases

```
## ALLURE REPORTS (ADD-ONS)

1. Install allure-playwright for Playwright integration: This package integrates Allure reports with Playwright. Install it using npm:
```bash
npm install allure-playwright --save-dev
```
2. Install Allure Command-Line Interface (CLI)
```bash
npm install -g allure-commandline --save-dev
```
3. Add the below changes to playwright.config.ts
```bash
  reporter: [
    // Allure Reporter configuration
    ['allure-playwright'],
  ],
```
4. Execute the test
5. Generate Allure Reports
```bash
npm run allurereport
```