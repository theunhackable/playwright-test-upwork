import { test } from '@playwright/test'
import { SignInPage } from '../pages/signin-page.po'


test('user needs to signin', async ({page}) => {
  const signinPage = new SignInPage(page)
 
  await signinPage.visit()

  await signinPage.fillUserName('standard_user')
  await signinPage.fillPassword('secret_sauce')

  await signinPage.submitLogin()

  await signinPage.checkIfSuccessful()

})