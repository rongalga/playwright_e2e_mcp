import { test, expect } from '@playwright/test';

test('Debug: Complete Order Flow', async ({ page }) => {
  let orderID = '';
  let orderEmail = 'john.doe@test.com';
  let productPrice = 0;

  // Step 1: Go to products
  await page.goto('https://valentinos-magic-beans.click/products');
  
  // Step 2: Find and click Add to Cart for Brazilian Santos
  const addButtons = page.locator('button:has-text("Add to Cart")');
  const firstAdd = addButtons.first();
  await firstAdd.click();
  
  // Step 3: Go to cart
  await page.goto('https://valentinos-magic-beans.click/cart');
  
  // Extract product price from cart
  const priceElement = page.locator('text=$22.99, text=$25.99, text=$26.99').first();
  const priceText = await priceElement.textContent({ timeout: 5000 }).catch(() => '$22.99');
  productPrice = parseFloat(priceText?.replace('$', '') || '22.99');
  console.log(`Product Price: ${priceText}`);
  
  // Step 4: Go directly to checkout
  await page.goto('https://valentinos-magic-beans.click/checkout');
  
  // Verify we're on checkout
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  
  // Get form state
  const firstNameInput = page.locator('input[placeholder="Valentino"]');
  const isFormVisible = await firstNameInput.isVisible({ timeout: 2000 }).catch(() => false);
  console.log(`Form visible: ${isFormVisible}`);
  
  if (isFormVisible) {
    // Fill form
    await firstNameInput.fill('John');
    await page.fill('input[placeholder="Bean"]', 'Doe');
    await page.fill('input[placeholder="you@example.com"]', orderEmail);
    await page.fill('input[placeholder="123 Magic Bean Lane"]', '123 Main St');
    await page.fill('input[placeholder="Beanville"]', 'New York');
    await page.fill('input[placeholder="12345"]', '10001');
    await page.fill('input[placeholder="Valentino Bean"]', 'John Doe');
    
    // Fill card details
    const inputs = await page.locator('input').all();
    console.log(`Total inputs found: ${inputs.length}`);
    
    if (inputs.length >= 10) {
      await inputs[7].fill('4111111111111111');
      await inputs[8].fill('12/25');
      await inputs[9].fill('123');
    }
    
    // Check for Place Order button
    const placeOrderBtn = page.locator('button:has-text("Place Order")');
    const btnVisible = await placeOrderBtn.isVisible({ timeout: 2000 }).catch(() => false);
    console.log(`Place Order button visible: ${btnVisible}`);
    
    if (btnVisible) {
      console.log('About to click Place Order...');
      
      // Listen for navigation
      const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {
        console.log('No navigation occurred');
      });
      
      await placeOrderBtn.click();
      await navigationPromise;
      
      const finalUrl = page.url();
      console.log(`Final URL after order: ${finalUrl}`);
      
      // Check if we got to a thank you/confirmation page
      if (finalUrl.includes('thank-you') || finalUrl.includes('order-confirmation')) {
        console.log('✅ Reached confirmation page');
        
        // Try to find Order ID
        const orderIdElement = await page.locator(':text("Order ID"), :text("#")').first();
        const orderIdText = await orderIdElement.textContent().catch(() => '');
        console.log(`Order ID Text: ${orderIdText}`);
        
        orderID = orderIdText || 'UNKNOWN';
      } else {
        console.log('❌ Did not reach confirmation page');
        
        // Check for errors
        const errorMessages = await page.locator('[role="alert"], .error, .alert-error').all();
        for (const error of errorMessages) {
          const text = await error.textContent();
          console.log(`Error message: ${text}`);
        }
      }
    }
  } else {
    console.log('Form not found on checkout page');
  }
  
  console.log(`\nTest Summary:
  - Product: Brazilian Santos
  - Price: $${productPrice}
  - Email: ${orderEmail}
  - Order ID: ${orderID}`);
});
