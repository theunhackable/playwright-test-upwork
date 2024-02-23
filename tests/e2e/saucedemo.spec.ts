import { test } from '@playwright/test'
import { SignInPage } from '../pages/signin-page.po';
import { ProductsPage } from '../pages/products-page.po';
import { CartPage } from '../pages/cart-page.po';
import { CheckOutPageOne } from '../pages/checkout-page-one.po';
import { CheckoutPageTwo } from '../pages/checkout-page-two.po';

test('user needs to signin', async ({page}) => {

    const signinPage = new SignInPage(page)
       
    await signinPage.visit()
      
    await signinPage.fillUserName('standard_user')
    await signinPage.fillPassword('secret_sauce')
      
    await signinPage.submitLogin()
      
    await signinPage.navigateToProductsPage()

        // add product to cart and check if the product is there in the cart
    const productsPage = new ProductsPage(page)

    await productsPage.addFirstItemToCart()
    const [name, price] = await productsPage.getFirstItemNameAndPrice()

    await productsPage.checkProductAddedToCart()
        
    await productsPage.navigateToCartPage();
        
        // cart page check
    const cartPage = new CartPage(page)

    await cartPage.checkFirstItemName(name as string)
    await cartPage.checkFirstItemPrice(price as string)

    await cartPage.checkOut()
    await cartPage.navigateToCheckoutOne()

    const checkoutOnePage = new CheckOutPageOne(page);

    await checkoutOnePage.fillForm()
    await checkoutOnePage.navigateToCheckOutPageTwo()

    const checkoutTwoPage = new CheckoutPageTwo(page);

    await checkoutTwoPage.checkTotal(price as string)
    await checkoutTwoPage.finishOrder()

})

