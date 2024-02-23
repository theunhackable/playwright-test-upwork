import { Page, expect } from "@playwright/test";

export class SignInPage {
  constructor(private readonly page: Page) {

  }
  async visit() {
        this.page.goto('https://www.saucedemo.com/v1/')
  }
  async fillUserName(userName: string) {
    const usernameInput = this.page.locator('[data-test="username"]')
    await usernameInput.fill(userName) 
  }
  async fillPassword(password: string) {
    const passwordInput = this.page.locator('[data-test="password"]')
    await passwordInput.fill(password)
  }
  async submitLogin() {
    const loginBtn = this.page.locator('[id="login-button"]')
    await loginBtn.click();

  }

  async checkIfSuccessful() {
    const productPageHeading = await this.page.locator('.product_label').textContent()
    expect(productPageHeading).toBe('Products')

  }
}