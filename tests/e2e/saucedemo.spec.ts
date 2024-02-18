import { expect, test } from '@playwright/test'
import exp from 'constants';

test.describe('handling whole functionality', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/v1/')
    })

    test('test', async({ page }) => {
        // login
        const usernameInput = page.locator('[data-test="username"]') 
        const password = page.locator('[data-test="password"]')
        const loginBtn = await page.locator('[id="login-button"]')
        
        await usernameInput.fill('standard_user')
        await password.fill('secret_sauce')
        await loginBtn.click()

        const productPageHeading = await page.locator('.product_label').textContent()
        // we will see Products page if we successfully loggedin
        expect(productPageHeading).toBe('Products')

        // add the first item to the cart and chek if the item is added to the cart
        const firstItem = page.locator('.inventory_item').first()
        

        const addToCartBtn = firstItem.getByRole('button')
        const itemName = await firstItem.locator('.inventory_item_name').textContent()
        const itemPrice = await firstItem.locator('.inventory_item_price').textContent()
        
        await addToCartBtn.click()
        
        const cart = page.locator('#shopping_cart_container')

        const cartText = await cart.textContent()
        expect(cartText).toContain('1')

        // click on the cart button and see if you got redirected to cart page
        await cart.click()

        const cartPageHeading = await page.locator('.subheader').textContent()
        expect( cartPageHeading).toBe('Your Cart')


        // check the name and price of the first cart item

        const firstCartItem = page.locator('.cart_item').first();
        const firstCartItemName = await firstCartItem.locator('.inventory_item_name').textContent()
        const firstCartItemPrice = await firstCartItem.locator('.inventory_item_price').textContent()
        
        expect(firstCartItemName).toBe(itemName)
        expect(`$${firstCartItemPrice}`).toBe(itemPrice)

        // click checkout and check if we got redirected to info page
        const checkOutBtn = page.getByRole('link', { name: 'CHECKOUT' })

        await checkOutBtn.click()

        const infoPageHeading = await page.locator('.subheader').textContent()

        expect(infoPageHeading).toBe('Checkout: Your Information')
        
        // fill the form

        const firstName = page.locator('#first-name')
        const lastName = page.locator('#last-name')
        const zipCode = page.locator('#postal-code')
        const continueBtn = page.getByRole('button', { name: 'CONTINUE' })
        await firstName.fill('Jhon')
        await lastName.fill('Wick')
        await zipCode.fill('321232')

        await continueBtn.click()

        // check if we got redirected to checkout page and check the item total is equal

        const checkoutPageHeading = await page.locator('.subheader').textContent()
        const itemTotal = await page.locator('.summary_subtotal_label').textContent()

        expect(checkoutPageHeading).toBe('Checkout: Overview')
        expect(`Item total: ${itemPrice}`).toBe(itemTotal)

        // click on finish and check if the order is confirmed
        const finishBtn = page.getByRole('link', { name: 'FINISH' })
        await finishBtn.click()

        const finishHeading = await page.locator('.subheader').textContent()
        expect(finishHeading).toBe('Finish')

    });
});