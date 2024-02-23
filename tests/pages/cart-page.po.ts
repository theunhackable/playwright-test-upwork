import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor( private readonly page: Page) {

  }
  async getFirstCartItem() {
    return this.page.locator('.cart_item').first();
    
  }
  async getFirstItemName() {

    const firstCartItem = await this.getFirstCartItem()
    return firstCartItem.locator('.inventory_item_name').textContent()

  }
  async getFirstItemPrice() {
    const firstCartItem = await this.getFirstCartItem()
    return firstCartItem.locator('.inventory_item_price').textContent()
  }
  async checkFirstItemName(name: string){
    expect(name).toBe(await this.getFirstItemName())
  }
  async checkFirstItemPrice(price: string) {
    expect(`$${await this.getFirstItemPrice()}`).toBe(price)

  }
  async checkOut() {
    const checkOutBtn = this.page.getByRole('link', { name: 'CHECKOUT' })

        await checkOutBtn.click()
  }

  async navigateToCheckoutOne(){
    const infoPageHeading = await this.page.locator('.subheader').textContent()
    expect(infoPageHeading).toBe('Checkout: Your Information')
  }
}