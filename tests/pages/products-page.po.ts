import { Page, expect } from "@playwright/test";

export class ProductsPage {
  constructor( private readonly page: Page) {

  }
  
  async addFirstItemToCart() {
    const firstItem = this.page.locator('.inventory_item').first()    
    const addToCartBtn = firstItem.getByRole('button')
    await addToCartBtn.click();
  }
  async getFirstItemNameAndPrice(){
    
    const firstItem = this.page.locator('.inventory_item').first()    
    const name = await firstItem.locator('.inventory_item_name').textContent() 
    const price = await firstItem.locator('.inventory_item_price').textContent()

    return [ name, price ]
  }
  async getCartBtn() {
    return this.page.locator('#shopping_cart_container')
  }
  async checkProductAddedToCart() {
    const cart = await this.getCartBtn()
    const cartText = await cart.textContent()
    expect(cartText).toContain('1')

  }

  async navigateToCartPage(){
    const cart = await this.getCartBtn();
    await cart.click()

    const cartPageHeading = await this.page.locator('.subheader').textContent()
    expect(cartPageHeading).toBe('Your Cart')

  }
}