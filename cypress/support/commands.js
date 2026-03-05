// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import LoginPage from "./POM/LoginPage";

// Cypress.Commands.add(
//   "loginSession",
//   (username = "standard_user", password = "secret_sauce") => {
//     cy.session("userSession", () => {
//       const loginPage = new LoginPage();

//       // visit halaman login dulu
//       loginPage.visit();
//       loginPage.login(username, password);
//       // pastikan login berhasil (ganti sesuai halaman setelah login)
//       loginPage.verifyLoginSuccess();
//     });

//     // Setelah session di-restore, visit halaman utama
//     cy.visit("https://www.saucedemo.com/");
//   },
// );
