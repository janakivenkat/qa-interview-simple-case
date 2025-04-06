/**********************************************************************
Name of test : signUp.test.ts
Description : Test to verify happy path, field validation of sign up functionality
Validation : To verify the success message in happy path , mandatory fields with length validation of each field
             and error message in error path test cases
Created By : Janaki Venkatesh 03-04-2025
Last Modified By : NA
Last Modified Description : NA
***********************************************************************/

import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { SignUpPage } from '../../pages/signUpFormPage'
import { LoginPage } from '../../pages/loginPage'

test.describe.configure({ mode: 'serial' })

// Sign up form test
test.describe('Sign Up form tests', () => {
  let signUpFormPage: SignUpPage
  let loginPage: LoginPage

  //before hook to navigate to sign up
  test.beforeEach(async ({ page }) => {
    signUpFormPage = new SignUpPage(page)
    loginPage = new LoginPage(page)
    await page.goto('http://localhost:8080/signup')
  });

  // sign up with new user and verify successfull log in 
  test('Sign up a new user and successful log in', async () => {
    // Fill in the sign-up form (replace with actual form fields)
    const existingUser = existingUsers[1]
    await signUpFormPage.signUp(existingUser.firstName,existingUser.lastName,existingUser.email, existingUser.password)
    await signUpFormPage.clickSubmitButton()
    //verify successful login by validating the welcome message
    await loginPage.isLoggedIn(existingUser.firstName,existingUser.lastName)
  })

  //verify mandatory field and length validation of each fields
  test('Should disable submit button when any field is cleared and check field is mandatory', async ({page}) => {
    const existingUser = existingUsers[2]
    // Fill in the sign-up form with valid data
    await signUpFormPage.signUp(existingUser.firstName,existingUser.lastName,existingUser.email,existingUser.password)

    // Initially, the submit button should be enabled
    const isButtonEnabled = await signUpFormPage.isSubmitButtonEnabled()
    expect(isButtonEnabled).toBe(true)
   
    // Array of field selectors to test
    const fieldSelectors = [
      { selector: '#firstName', name: 'First Name', minLength: 1, validate: (value: string) => value.length >= 1 },
      { selector: '#lastName', name: 'Last Name', minLength: 1, validate: (value: string) => value.length >= 1 },
      { selector: '#email', name: 'Email', minLength: 1, validate: (value: string) => value.includes('@') },
      { selector: '#password', name: 'Password', minLength: 8, validate: (value: string) => value.length >= 8 }
    ];

    // Iterate over each field and clear it, then check if the submit button is disabled and verify the validation
    for (const { selector, validate } of fieldSelectors) {
      // Clear the field
      await page.fill(selector, '')

      // Verify that the submit button is disabled after clearing the field
       expect(await signUpFormPage.isSubmitButtonEnabled()).toBe(false)

      // Refill the field with the original value to test the next field
      switch (selector) {
        case '#firstName':
          await page.fill(selector, existingUser.firstName)
          break
        case '#lastName':
          await page.fill(selector, existingUser.lastName)
          break
        case '#email':
          await page.fill(selector, existingUser.email)
          break
        case '#password':
          await page.fill(selector, existingUser.password)
          break
      }

      // Check if the field has the minimum length or meets the validation
      const fieldValue = await page.inputValue(selector)
      // Ensure that the field validation passes
      expect(validate(fieldValue)).toBe(true) 

      // Ensure the submit button is re-enabled after refilling the field
      expect(await signUpFormPage.isSubmitButtonEnabled()).toBe(true)
    }
  })
})