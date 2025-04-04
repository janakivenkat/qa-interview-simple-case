// pages/signUpPage.ts
import { Page, expect } from '@playwright/test';

export class SignUpPage {
  constructor(private page: Page) {}

  // Locators for sign-up page elements
  private firstNameInput = 'input[id="firstName"]';
  private lastNameInput = 'input[id="lastName"]';
  private emailInput = 'input[id="email"]';
  private passwordInput = 'input[id="password"]';
  private submitButton = 'button.MuiButton-containedPrimary.MuiButton-sizeMedium';
  //const button = page.locator('button.MuiButton-containedPrimary.MuiButton-sizeMedium')

  // Method to fill the sign-up form and submit
  async signUp(firstName: string, lastName: string, email: string, password: string) {
    await expect(this.page.locator(this.emailInput)).toBeVisible()
    await this.page.fill(this.firstNameInput, firstName)
    await expect(this.page.locator(this.emailInput)).toBeVisible()
    await this.page.fill(this.lastNameInput, lastName)
    await expect(this.page.locator(this.emailInput)).toBeVisible()
    await this.page.fill(this.emailInput, email)
    await expect(this.page.locator(this.passwordInput)).toBeVisible()
    await this.page.fill(this.passwordInput, password)
  }

  async clickSubmitButton() {
    await expect(this.page.locator(this.submitButton)).not.toBeDisabled()
    await this.page.click(this.submitButton)
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    const submitButtonCheck = this.page.locator(this.submitButton)
    return await submitButtonCheck.isEnabled()
  }
}