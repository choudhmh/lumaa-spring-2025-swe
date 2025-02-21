describe("Create Task", () => {
    beforeEach(() => {
      // Simulate a logged-in user (modify this if needed)
      localStorage.setItem("token", "fake_jwt_token");
      cy.visit("/taskform");
    });
  
    it("should create a new task", () => {
      cy.get('input[placeholder="Task Title"]').type("New Cypress Task");
      cy.get('input[placeholder="Task Description"]').type("This is a test task created using Cypress");
  
      cy.contains("Create Task").click();
  
      // Verify the success alert
      cy.on("window:alert", (str) => {
        expect(str).to.equal("✅ Task Created Successfully!");
      });
  
      cy.url().should("include", "/dashboard"); // Verify redirection to dashboard
    });
  });
  