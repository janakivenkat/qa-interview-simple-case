// pages/loginPage.ts
import { Page, expect, Locator } from '@playwright/test'

export class LoginPage {
  private page: Page;

  // Locators for the Login Page
  private emailField: Locator
  private passwordField: Locator
  private loginButton: Locator
  private errorMessage: Locator
  private welcomeMessage: Locator
  private title: Locator

  constructor(page: Page) {
    this.page = page

    // Initialize locators
    this.emailField = page.locator('[id="email"]')
    this.passwordField = page.locator('[id="password"]')
    this.loginButton = page.locator('button.MuiButton-containedPrimary.MuiButton-sizeMedium')
    this.errorMessage = page.locator('//*[@id="root"]')
    this.welcomeMessage = page.locator('#root >> div')
    this.title = page.locator('h2')
  }

  // Method to log in
  async login(email: string, password: string) {
    await expect(this.emailField).toBeVisible()
    await this.emailField.fill(email)
    await expect(this.passwordField).toBeVisible()
    await this.passwordField.fill(password)
    await expect(this.loginButton).not.toBeDisabled()
    await this.loginButton.click()
  }

  //Method to verify landing page text
  async verifyLandingPage(landingText: string) {
    await expect(this.title).toBeVisible()
    await expect(this.title).toHaveText(landingText)
  }

  // Method to check for welcome message after successful log in 
  async isLoggedIn(firstName: string, lastName: string) {
    await this.page.waitForSelector('text="Log out"')
    await expect(this.page.getByText('Log out')).toBeVisible()
    // Verify welcome message
    expect(this.welcomeMessage).toHaveText(`Welcome ${firstName} ${lastName}`)
  }

  // Assertion: Verify error message is visible
  async isErrorMessageVisible() {
    await this.errorMessage.isVisible()
    await expect(this.errorMessage).toContainText('Invalid credentials')
  }
}