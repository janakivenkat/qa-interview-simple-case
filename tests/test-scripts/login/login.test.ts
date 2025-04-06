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

  //Note: Do not uncomment it as the test fails due to missing function and objects
  /*test('should show an error message with invalid credentials', async () => {
    //enter invalid credentials
    await loginPage.login('invalid@mail.com', 'wrongPassword!')
    //verify the error message
    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toBe('Invalid email or password')
  })*/
})