import { test } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { LoginPage } from '../../pages/loginPage'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('http://localhost:8080/login');
  });

  test('Log in with existing account', async () => {
    const existingUser = existingUsers[0]

    // Log in with valid credentials
    await loginPage.login(existingUser.email, existingUser.password)

    //verify successful login by validating the welcome message
    await loginPage.isLoggedIn(existingUser.firstName,existingUser.lastName)
  })
})
