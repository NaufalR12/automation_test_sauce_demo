class CheckOutPage {
  // ═══════════════════════════════════════════════
  // ELEMENTS (Selectors)
  // ═══════════════════════════════════════════════

  // Login Elements
  get usernameField() {
    return cy.get("#user-name");
  }

  get passwordField() {
    return cy.get("#password");
  }

  get loginButton() {
    return cy.get("#login-button");
  }

  // Product & Cart Elements
  get addToCartButton() {
    return cy.get("#add-to-cart-sauce-labs-backpack");
  }

  get cartBadge() {
    return cy.get(".shopping_cart_badge");
  }

  get cartButton() {
    return cy.get(".shopping_cart_link");
  }

  get checkoutButton() {
    return cy.get('#checkout');
  }

  // Checkout Form Elements
  get firstNameField() {
    return cy.get('#first-name');
  }

  get lastNameField() {
    return cy.get('#last-name');
  }

  get postalCodeField() {
    return cy.get('#postal-code');
  }

  get continueButton() {
    return cy.get('#continue');
  }

  get finishButton() {
    return cy.get('#finish');
  }

  get errorMessage() {
    return cy.get('.error-message-container');
  }

  get completeHeader() {
    return cy.get('.complete-header');
  }

  get backToProductsButton() {
    return cy.get('#back-to-products');
  }

  // ═══════════════════════════════════════════════
  // ACTIONS (Methods)
  // ═══════════════════════════════════════════════

  visit() {
    cy.visit("https://www.saucedemo.com/");
    cy.url().should("include", "saucedemo.com");
  }

  fillUsername(username) {
    this.usernameField.clear().type(username);
  }

  fillPassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSubmit() {
    this.loginButton.click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickSubmit();
  }

  addProductToCart() {
    this.addToCartButton.click();
  }

  goToCart() {
    this.cartButton.click();
  }

  clickCheckout() {
    this.checkoutButton.click();
  }

  fillFirstName(firstName) {
    this.firstNameField.clear().type(firstName);
  }

  fillLastName(lastName) {
    this.lastNameField.clear().type(lastName);
  }

  fillPostalCode(postalCode) {
    this.postalCodeField.clear().type(postalCode);
  }

  fillCheckoutForm(firstName, lastName, postalCode) {
    if (firstName) this.fillFirstName(firstName);
    if (lastName) this.fillLastName(lastName);
    if (postalCode) this.fillPostalCode(postalCode);
  }

  clickContinue() {
    this.continueButton.click();
  }

  clickFinish() {
    this.finishButton.click();
  }

  completeCheckout(firstName, lastName, postalCode) {
    this.fillCheckoutForm(firstName, lastName, postalCode);
    this.clickContinue();
    this.clickFinish();
  }

  // ═══════════════════════════════════════════════
  // ASSERTIONS (Validasi)
  // ═══════════════════════════════════════════════

  verifyInInventoryPage() {
    cy.url().should("include", "/inventory.html");
  }

  verifyInCartPage() {
    cy.url().should("include", "/cart.html");
  }

  verifyInCheckoutPage() {
    cy.url({ timeout: 10000 }).should("include", "/checkout-step-one.html");
  }

  verifyInCheckoutOverview() {
    cy.url().should("include", "/checkout-step-two.html");
  }

  verifyCheckoutComplete() {
    cy.url().should("include", "/checkout-complete.html");
    this.completeHeader.should("be.visible");
    this.completeHeader.should("contain", "Thank you for your order");
  }

  verifyCartBadge(count) {
    this.cartBadge.should("have.text", count.toString());
  }

  verifyErrorMessage() {
    this.errorMessage.should("be.visible");
  }

  verifyErrorMessageContains(text) {
    this.errorMessage.should("be.visible");
    this.errorMessage.should("contain", text);
  }
}

export default CheckOutPage;
