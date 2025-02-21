describe("User Login", () => {
    it("should log in successfully", () => {
      cy.visit("/login");
  
      cy.get('input[placeholder="Email"]').type("test@example.com");
      cy.get('input[placeholder="Password"]').type("password123");
  
      cy.contains("Login").click();
  
      cy.url().should("include", "/dashboard"); // Verify redirection to dashboard
    });
  });
  