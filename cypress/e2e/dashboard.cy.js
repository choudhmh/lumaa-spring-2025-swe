describe('Task Dashboard', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); // Start from login page
    });
  
    it('Logs in and navigates to Dashboard', () => {
      cy.get('input[name="email"]').type('test@example.com'); // Fill in email
      cy.get('input[name="password"]').type('password123'); // Fill in password
      cy.get('button[type="submit"]').click(); // Click login button
  
      // Verify navigation to dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('📋 Task Dashboard').should('be.visible');
    });
  
    it('Creates a new task', () => {
      cy.get('.create-btn').click(); // Click "Create Task"
      cy.get('input[name="title"]').type('New Cypress Task');
      cy.get('input[name="description"]').type('This is a test task');
      cy.get('button[type="submit"]').click();
  
      // Verify task is created
      cy.contains('New Cypress Task').should('be.visible');
    });
  
    it('Deletes a task', () => {
      cy.get('.delete-link').first().click(); // Click delete on the first task
      cy.on('window:confirm', () => true); // Confirm the alert
  
      // Verify task is removed
      cy.contains('New Cypress Task').should('not.exist');
    });
  });
  