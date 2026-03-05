import CheckOutPage from "../support/POM/checkout";
import "../support/commands";

describe("Data Driven Testing - Checkout Product", () => {
  const checkoutPage = new CheckOutPage();
  let checkoutData;

  // Load data dari file JSON
  before(() => {
    cy.fixture("users/checkoutUsers").then((data) => {
      checkoutData = data;
    });
  });

  beforeEach(() => {
    checkoutPage.visit();
    // Login terlebih dahulu dengan user valid
    checkoutPage.login("standard_user", "secret_sauce");
    //cy.loginSession();
    cy.wait(1000); // Tunggu sebentar untuk memastikan halaman inventory sudah dimuat
    checkoutPage.verifyInInventoryPage();
  });

  // ═══════════════════════════════════════════════
  // POSITIVE TEST - Checkout Valid
  // ═══════════════════════════════════════════════
  it("TC01 - Berhasil checkout dengan data valid lengkap", () => {
    const { firstName, lastName, postalCode } = checkoutData.validCheckout;

    // Add product to cart
    checkoutPage.addProductToCart();
    checkoutPage.verifyCartBadge(1);

    // Go to cart
    checkoutPage.goToCart();
    checkoutPage.verifyInCartPage();

    // Click checkout
    checkoutPage.clickCheckout();
    checkoutPage.verifyInCheckoutPage();

    // Fill checkout form
    checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    checkoutPage.clickContinue();

    // Verify overview page
    checkoutPage.verifyInCheckoutOverview();

    // Finish checkout
    checkoutPage.clickFinish();

    // Validasi: checkout berhasil
    checkoutPage.verifyCheckoutComplete();
  });

  // ═══════════════════════════════════════════════
  // NEGATIVE TEST - Checkout Invalid
  // ═══════════════════════════════════════════════
  it("TC02 - Gagal checkout tanpa mengisi semua field (kosong)", () => {
    // Add product to cart
    checkoutPage.addProductToCart();
    checkoutPage.verifyCartBadge(1);

    // Go to cart
    checkoutPage.goToCart();
    checkoutPage.verifyInCartPage();

    // Click checkout
    checkoutPage.clickCheckout();
    checkoutPage.verifyInCheckoutPage();

    // Klik continue tanpa mengisi form
    checkoutPage.clickContinue();

    // Validasi: tetap di halaman checkout & muncul error
    checkoutPage.verifyInCheckoutPage();
    checkoutPage.verifyErrorMessageContains("First Name is required");
  });

  it("TC03 - Gagal checkout tanpa mengisi First Name", () => {
    const { lastName, postalCode } = checkoutData.missingFirstName;

    // Add product to cart
    checkoutPage.addProductToCart();
    checkoutPage.verifyCartBadge(1);

    // Go to cart
    checkoutPage.goToCart();
    checkoutPage.verifyInCartPage();

    // Click checkout
    checkoutPage.clickCheckout();
    checkoutPage.verifyInCheckoutPage();

    // Fill checkout form tanpa first name
    checkoutPage.fillCheckoutForm(null, lastName, postalCode);
    checkoutPage.clickContinue();

    // Validasi: tetap di halaman checkout & muncul error
    checkoutPage.verifyInCheckoutPage();
    checkoutPage.verifyErrorMessageContains("First Name is required");
  });

  it("TC04 - Gagal checkout tanpa mengisi Last Name", () => {
    const { firstName, postalCode } = checkoutData.missingLastName;

    // Add product to cart
    checkoutPage.addProductToCart();
    checkoutPage.verifyCartBadge(1);

    // Go to cart
    checkoutPage.goToCart();
    checkoutPage.verifyInCartPage();

    // Click checkout
    checkoutPage.clickCheckout();
    checkoutPage.verifyInCheckoutPage();

    // Fill checkout form tanpa last name
    checkoutPage.fillCheckoutForm(firstName, null, postalCode);
    checkoutPage.clickContinue();

    // Validasi: tetap di halaman checkout & muncul error
    checkoutPage.verifyInCheckoutPage();
    checkoutPage.verifyErrorMessageContains("Last Name is required");
  });

  it("TC05 - Gagal checkout tanpa mengisi Postal Code", () => {
    const { firstName, lastName } = checkoutData.missingPostalCode;

    // Add product to cart
    checkoutPage.addProductToCart();
    checkoutPage.verifyCartBadge(1);

    // Go to cart
    checkoutPage.goToCart();
    checkoutPage.verifyInCartPage();

    // Click checkout
    checkoutPage.clickCheckout();
    checkoutPage.verifyInCheckoutPage();

    // Fill checkout form tanpa postal code
    checkoutPage.fillCheckoutForm(firstName, lastName, null);
    checkoutPage.clickContinue();

    // Validasi: tetap di halaman checkout & muncul error
    checkoutPage.verifyInCheckoutPage();
    checkoutPage.verifyErrorMessageContains("Postal Code is required");
  });
});
