describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function(){
    cy.contains('Log in')
  })
  it.only('opens log in form on button click', function(){
    cy.contains('Log in').click()
    cy.contains('Username')
    cy.contains('Password')
  })
})
