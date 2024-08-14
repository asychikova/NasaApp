describe('Navigation Tests', () => {
    it('Visits the base URL', () => {
      cy.visit('/'); 
      cy.contains('The beauty of the cosmos captured on canvas'); 
    });
  
    it('Visits a register', () => {
      cy.visit('https://nasa-app-u59x.vercel.app/auth/register'); 
      cy.contains('Create a new account'); 
    });
  
    it('Visits a login', () => {
      cy.visit('https://nasa-app-u59x.vercel.app/auth/login'); 
      cy.contains('Login'); 
    });
  
    it('Cannot navigate to /cart without being logged in', () => {
        cy.visit('/cart')
          .url().should('include', '/login');
      });
  });
  