// pages/signUpPage.ts
import { Page, expect, Locator } from '@playwright/test'

export class SignUpPage {
  private page: Page;

  // Locators for the Login Page
  private firstNameInput: Locator
  private lastNameInput: Locator
  private emailField: Locator
  private passwordField: Locator
  private submitButton: Locator

  constructor(page: Page) {
    this.page = page

    // Initialize locators
    this.firstNameInput = page.locator('[id="firstName"]')
    this.lastNameInput = page.locator('[id="lastName"]')
    this.emailField = page.locator('[id="email"]')
    this.passwordField = page.locator('[id="password"]')
    this.submitButton = page.locator('button.MuiButton-containedPrimary.MuiButton-sizeMedium')

  }


  // Method to fill the sign-up form and submit
  async signUp(firstName: string, lastName: string, email: string, password: string) {
    await expect(this.firstNameInput).toBeVisible()
    await this.firstNameInput.fill(firstName)
    await expect(this.lastNameInput).toBeVisible()
    await this.lastNameInput.fill(lastName)
    await expect(this.emailField).toBeVisible()
    await this.emailField.fill(email)
    await expect(this.passwordField).toBeVisible()
    await this.passwordField.fill(password)
  }

  // Method to click submit button
  async clickSubmitButton() {
    await expect(this.submitButton).not.toBeDisabled()
    await this.submitButton.click()
  }

  // Method to verify submit button is enabled
  async isSubmitButtonEnabled(): Promise<boolean> {
    const submitButtonCheck = this.submitButton
    return await submitButtonCheck.isEnabled()
  }
}