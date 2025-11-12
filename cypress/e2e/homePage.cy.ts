/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    // Cambia esta URL por la de tu proyecto local o de despliegue
    cy.visit('http://localhost:3000');
  });

  it('should display the hero section correctly', () => {
    // Verifica que la sección de inicio exista
    cy.get('#inicio').should('exist');

    // Comprueba que el título principal se muestre correctamente
    cy.contains('Descubre la Excelencia en Cada Producto').should('be.visible');

    // Verifica que el botón "Ver Productos" exista
    cy.contains('Ver Productos').should('exist');
  });

  it('should scroll to products section when clicking the button', () => {
    // Asegúrate de que exista el botón
    cy.contains('Ver Productos').should('exist').click();

    // Espera un poco para que el scroll se complete
    cy.wait(1000);

    // Comprueba que el elemento con id "productos" esté visible (debes tenerlo en tu página)
    cy.get('#productos').should('be.visible');
  });
});
