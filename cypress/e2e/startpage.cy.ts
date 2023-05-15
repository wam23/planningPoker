describe('planningPoker', () => {

  beforeEach(() => {
    cy.intercept("/cardset", { fixture: "cardset.json" }).as('get cardset');
    cy.intercept("/poll/*/init", { statusCode: 200 }).as('init poll');
    cy.intercept("/poll/*", { fixture: "poll.json", delayMs: 500 }). as('long polling');
    cy.intercept("/rooms/*/vote", { statusCode: 204 }).as('send vote');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('input[name="room"]').type('Scrum');
    cy.get('input[name="name"]').type('John');
    cy.get('select[name="theme"]').select('gold');
    cy.get('.btn').click();
  });

  it('load start page', () => {
    cy.get('.jumbotron').contains('Schaetzmaschine');
  });

  it('login to room', () => {
    cy.get('.lead').contains('John in Scrum');
    
    cy.wait(500).as('wait for long-poll update');
    cy.get('.result-name').contains('test');
    cy.get('.result-mini-card').contains('5');
  });

  it('vote in room', () => {
    cy.get('.container > :nth-child(4)').click();
    cy.get('.card-selected').contains('3');
    cy.get('small').contains('gespeichert');
  });
})
