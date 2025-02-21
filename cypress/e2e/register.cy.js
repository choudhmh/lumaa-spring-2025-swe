describe("User Registration", () => {
    it("should register a new user", () => {
      cy.visit("/register");
  
      cy.get('input[placeholder="Name"]').type("John Doe");
      cy.get('input[placeholder="Email"]').type("test@example.com");
      cy.get('input[placeholder="Password"]').type("password123");
  
      cy.contains("Register").click();
  
      // Ensure registration success alert appears
      cy.on("window:alert", (str) => {
        expect(str).to.equal("✅ Registration successful! Please log in.");
      });
  
      cy.url().should("include", "/login"); // Verify redirection to login page
    });
  });
  