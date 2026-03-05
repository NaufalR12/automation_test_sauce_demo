describe("Basic selector & actions - sauce demo", () => {
  //1. visit page
  describe("1. Visit page", () => {
    it("Should visit the login page (homepage)", () => {
      cy.visit("https://saucedemo.com/");
      cy.url().should("include", "saucedemo.com");
    });

    it("Should visit the inventory page (after login)", () => {
      cy.visit("https://saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.location("pathname").should("eq", "/inventory.html");
    });

    it("Should visit the cart page (after login()", () => {
      cy.visit("https://saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.get(".shopping_cart_link").click();
      cy.url().should("eq", "https://www.saucedemo.com/cart.html");
    });
  });

  // 2. mengambil element
  describe("2. cy.get - mengambil element", () => {
    beforeEach(() => {
      cy.visit("https://www.saucedemo.com/");
    });

    it("get element by id -> #user-name", () => {
      cy.get("#user-name").type("standard_user");
    });

    it("get element by class -> .login_container", () => {
      cy.get(".login_container").should("be.visible");
    });

    it("get element by tag -> input", () => {
      cy.get("input").should("exist");
    });

    it('get element by attribute -> input[type="password"]', () => {
      cy.get('input[type="password"]').should("exist");
    });

    it("get element by combined selector -> input#user-name", () => {
      cy.get("input#user-name").should("exist");
    });

    it("get element by text -> cy.contains()", () => {
      cy.contains("Swag Labs").should("be.visible");
    });
  });

  // ═══════════════════════════════════════════════
  // 3. TYPE TEXT (.type)
  // ═══════════════════════════════════════════════
  describe("2. cy.get - Mengambil Element", () => {
    beforeEach(() => {
      cy.visit("https://www.saucedemo.com/");
    });
    // beforeEach() → Hook yang berjalan SEBELUM SETIAP test case (bukan sekali saja)
    // Berbeda dengan before() yang hanya jalan 1x

    it("get element by ID → #user-name", () => {
      cy.get("#user-name").should("exist");
      // # → CSS selector untuk ID
      // .should('exist') → Memverifikasi elemen ada di DOM
    });

    it("get element by Class → .login_container", () => {
      cy.get(".login_container").should("be.visible");
      // . → CSS selector untuk Class
      // 'be.visible' → Elemen ada di DOM DAN terlihat oleh user
    });

    it("get element by Tag → input", () => {
      cy.get("input").should("exist");
      // Tanpa # atau . → Mengambil berdasarkan tag HTML langsung
    });

    it('get element by Attribute → input[type="password"]', () => {
      cy.get('input[type="password"]').should("exist");
      // [attribute="value"] → Selector berdasarkan atribut HTML
      // Mengambil <input> yang punya type="password"
    });

    it("get element by Combined selector → input#user-name", () => {
      cy.get("input#user-name").should("exist");
      // Kombinasi: tag + ID → lebih spesifik
      // Cari elemen <input> yang punya id="user-name"
    });

    it("get element by Text → cy.contains()", () => {
      cy.contains("Swag Labs").should("be.visible");
      // cy.contains() → Mencari elemen berdasarkan TEXT CONTENT
      // Berbeda dengan cy.get() yang pakai CSS selector
    });
  });
  // ═══════════════════════════════════════════════
  // 4. CLICK (.click)
  // ═══════════════════════════════════════════════
  describe("4. Click - Klik Element", () => {
    it("should click login button to login", () => {
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
      cy.url().should("include", "/inventory.html");
    });

    // ═══════════════════════════════════════════════
    // 5. ASSERTIONS (.should)
    // ═══════════════════════════════════════════════
    describe("5. Assertions - Validasi Element", () => {
      beforeEach(() => {
        cy.visit("https://www.saucedemo.com/");
      });

      it("should verify element EXISTS", () => {
        cy.get(".login_container").should("exist");
      });

      it("should verify element IS VISIBLE", () => {
        cy.get(".login_container").should("be.visible");
      });

      it("should verify element HAS ATTRIBUTE", () => {
        cy.get("#user-name").should("have.attr", "placeholder", "Username");
      });

      it("should verify element count (HAVE LENGTH)", () => {
        cy.get("input").should("have.length.greaterThan", 1);
      });

      it("should verify page TITLE", () => {
        cy.title().should("contain", "Swag Labs");
      });

      it("should verify URL contains specific path", () => {
        cy.url().should("include", "saucedemo.com");
      });
    });

    // ═══════════════════════════════════════════════
    // 6. WAIT (cy.wait)
    // ═══════════════════════════════════════════════
    describe("6. Wait - Menunggu", () => {
      it("should wait 2 seconds before checking the page", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.wait(2000); // Tunggu 2 detik
        cy.get(".login_container").should("be.visible");
      });

      it("should wait between actions", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type("standard_user");
        cy.wait(1000); // Tunggu 1 detik
        cy.get("#password").type("secret_sauce");
        cy.wait(1000); // Tunggu 1 detik
        cy.get("#user-name").should("have.value", "standard_user");
        cy.get("#password").should("have.value", "secret_sauce");
      });

      it("should wait after clicking login", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.wait(2000); // Tunggu halaman selesai load
        cy.url().should("include", "/inventory.html");
        cy.get(".title").should("contain.text", "Products");
      });
    });
  });
});
