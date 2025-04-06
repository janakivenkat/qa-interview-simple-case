// pages/loginPage.ts
import { Page, expect } from '@playwright/test'

export class LoginPage {
  constructor(private page: Page) {}

  // Locators for login page elements
  private emailInput = 'input[id="email"]'
  private passwordInput = 'input[id="password"]'
  private submitButton = 'button.MuiButton-containedPrimary.MuiButton-sizeMedium'
  private welcomeMessage = '#root >> div'
  private title = 'h2'

  // Method to log in
  async login(email: string, password: string) {
    await expect(this.page.locator(this.emailInput)).toBeVisible()
    await this.page.fill(this.emailInput, email)
    await expect(this.page.locator(this.passwordInput)).toBeVisible()
    await this.page.fill(this.passwordInput, password)
    await expect(this.page.locator(this.submitButton)).not.toBeDisabled()
    await this.page.click(this.submitButton)
  }

  //Method to verify landing page text
  async verifyLandingPage(landingText: string) {
    await expect(this.page.locator(this.title)).toBeVisible()
    await expect(this.page.locator(this.title)).toHaveText(landingText)
  }

  // Method to check for welcome message
  async isLoggedIn(firstName: string, lastName: string) {
    await this.page.waitForSelector('text="Log out"')
    await expect(this.page.getByText('Log out')).toBeVisible()
    
    // Verify welcome message
    expect(this.page.locator(this.welcomeMessage)).toHaveText(`Welcome ${firstName} ${lastName}`)
  }
}