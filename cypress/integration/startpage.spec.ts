describe('planningPoker', () => {

  beforeEach(() => {
    cy.intercept("/cardset", { fixture: "cardset.json" });
    cy.intercept("/poll/*/init", { statusCode: 200 });
    cy.intercept("/poll/*", { fixture: "poll.json", delayMs: 5000 });
    cy.intercept("/rooms/*/vote", { statusCode: 204 });
  });

  it('load start page', () => {
    cy.visit('/')
    cy.get('.jumbotron').contains('Planning Poker')
  })
})
