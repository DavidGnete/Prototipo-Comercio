/// <reference types="cypress" />

describe('Products / Categories', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens categories drawer and selects "Todas" (resets category query)', () => {
    // Open the categories drawer
    cy.get('button[aria-label="Abrir categorias"]').click();

    cy.contains('Categorías').should('be.visible');

    // Click Todas and make sure query param is cleared
    cy.contains('button', 'Todas').click();
    cy.url().should('not.include', 'category=');
  });

  it('adds a product to cart and verifies localStorage', () => {
    // Try to find an add-to-cart button and click it
    cy.get('button[aria-label="Añadir al carrito"]').first().click();

    // Confirm localStorage contains at least one item in cart
    cy.window().then((win) => {
      const raw = win.localStorage.getItem('cart');
      expect(raw).not.to.be.null;
      const cart = JSON.parse(raw || '{}');
      expect(Object.keys(cart).length).to.be.greaterThan(0);
    });
  });
});
