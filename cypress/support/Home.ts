describe('Home Page Hero Section', () => {
  beforeEach(() => {
    // visit your Next.js homepage
    cy.visit('http://localhost:3000')
  })

  it('renders the hero section', () => {
    cy.get('section#inicio').should('exist')
    cy.contains('Descubre la Excelencia en Cada Producto').should('be.visible')
  })

  it('renders the hero image', () => {
    cy.get('img[alt="Hero background"]').should('be.visible')
  })

  it('scrolls to products section when clicking the button', () => {
    cy.get('button').contains('Ver Productos').click()

    // verify that the URL hash changes (if the section exists)
    cy.url().should('include', '#productos')

    // OR if you don’t use hashes, check if the element exists
    cy.get('#productos').should('exist')
  })
})
