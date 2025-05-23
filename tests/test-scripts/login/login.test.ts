/**********************************************************************
Name of test : login.test.ts
Description : Test to verify happy path and error path of login functionality
Validation : To verify the success message in happy path and error message in error path test cases
Created By : Janaki Venkatesh 03-04-2025
Last Modified By : NA
Last Modified Description : NA
***********************************************************************/

import { test } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage'
import { getUserDataFromLocalStorage } from '../../utils/helper'

test.describe.configure({ mode: 'serial' })

test.describe('Login form tests', () => {

  let loginPage: LoginPage

  //Before hook to navigate to the login page
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login')
    await loginPage.verifyLandingPage('Login')
  });

  //Log in with valid credentials
  test('Log in with existing account', async ({ page }) => {
    // Get the user data for the first user (index 0) from localStorage
    const existingUser = await getUserDataFromLocalStorage(page, 0)

    // Log in with valid credentials
    await loginPage.login(existingUser.email, existingUser.password)

    //verify successful login by validating the welcome message
    await loginPage.isLoggedIn(existingUser.firstName, existingUser.lastName)
  })

  //Verify error message while logging in with invalid credentials
  test('Log in with invalid credentials', async () => {
    //enter invalid credentials
    const invalidUser = { email: 'invalid@mail.com', password: 'wrongPassword' }
    await loginPage.login(invalidUser.email, invalidUser.password)
    await loginPage.isErrorMessageVisible()
  })
})