import { Page, expect } from "@playwright/test";

export class CheckoutPageTwo{
  
  constructor(private readonly page: Page){
  }

  async checkTotal(price: string) {
    const itemTotal = await this.page.locator('.summary_subtotal_label').textContent()

    expect(`Item total: ${price}`).toBe(itemTotal)

  }

  async finishOrder() {
    const finishBtn = this.page.getByRole('link', { name: 'FINISH' })
    await finishBtn.click()
    
    const finishHeading = await this.page.locator('.subheader').textContent()
    expect(finishHeading).toBe('Finish')
  }
}