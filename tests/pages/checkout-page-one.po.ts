import { Page, expect } from "@playwright/test";

export class CheckOutPageOne {
  constructor(private readonly page: Page){

  }

  async fillForm() {
    const firstName = this.page.locator('#first-name')        
    const lastName = this.page.locator('#last-name')
    const zipCode = this.page.locator('#postal-code')
    await firstName.fill('Jhon')
    await lastName.fill('Wick')
    await zipCode.fill('321232')
    
  }
  
  async navigateToCheckOutPageTwo() {

    const continueBtn = this.page.getByRole('button', { name: 'CONTINUE' })
    await continueBtn.click()  
    const checkoutPageHeading = await this.page.locator('.subheader').textContent()
    expect(checkoutPageHeading).toBe('Checkout: Overview')

  }
  

        // check if we got redirected to checkout page and check the item total is equal

}