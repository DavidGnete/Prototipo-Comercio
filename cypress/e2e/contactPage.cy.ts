/// <reference types="cypress" />

describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact'); // Goes to your Contact page before each test
  });

  it('should display address, phone, and email', () => {
    cy.contains('Dirección').should('exist');
    cy.contains('Teléfono').should('exist');
    cy.contains('Email').should('exist');
    cy.contains('Síguenos en Redes').should('exist');
  });

  it('should render Benefits and Map components', () => {
    cy.get('section#contacto').within(() => {
      cy.get('div').should('exist');
    });
    // You can make this more specific if Benefits/Map have IDs or unique elements
  });
});
