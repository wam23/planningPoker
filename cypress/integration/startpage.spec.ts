describe('planningPoker', () => {
  it('load start page', () => {
    cy.visit('/')
    cy.get('.jumbotron').contains('Planning Poker')
  })
})
