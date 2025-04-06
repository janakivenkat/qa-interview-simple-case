import { Page } from '@playwright/test'

// Helper function to get user data from localStorage using evaluate
export async function getUserDataFromLocalStorage(page: Page, userIndex: number) {
  // Evaluate the localStorage in the context of the page
  const userData = await page.evaluate((index) => {
    const users = JSON.parse(localStorage.getItem('users') || '{"users": []}').users
    return users.length > index ? users[index] : null
  }, userIndex)

  // Throw an error if the user is not found
  if (!userData) {
    throw new Error(`User with index ${userIndex} not found in localStorage`)
  }

  return userData
}