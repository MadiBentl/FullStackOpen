describe('Blog App', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'DangerMonkey',
      password: 'veryEvil',
      name: 'Ms Evil Monkey'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', newUser)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function(){
    cy.contains('Log in').click()
    cy.contains('Username')
    cy.contains('Password')
  })
  describe('Login', function(){
    it('logs in with correct credentials', function(){
      cy.contains('Log in').click()
      cy.get('#username').type('DangerMonkey')
      cy.get('#password').type('veryEvil')
      cy.get('#login_button').click()
    })
    it('does not log in with incorrect credentials', function(){
      cy.contains('Log in').click()
      cy.get('#username').type('DangerMonkey')
      cy.get('#password').type('sinner')
      cy.get('#login_button').click()
      cy.contains('Wrong Username or password')
      cy.get('.bad-notification').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
  })
  describe('Only when logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'DangerMonkey', password: 'veryEvil' })
    })
    it('Blogform opens on click', function(){
      cy.contains('Add a blog').click()
      cy.contains('Title')
      cy.contains('Author')
    })
    it('User may post blog article', function(){
      cy.contains('Add a blog').click()
      cy.get('#title').type('The world\'s ten most evil monkeys - you won\'t believe number 6')
      cy.get('#author').type('PapalMonkeyButt')
      cy.get('#url').type('monkeysrule.com')
      cy.get('#add_blog').click()

      cy.contains('The world\'s ten most evil monkeys - you won\'t believe number 6')
      cy.contains('Show')
    })
    describe('And one user-created blog exists', function(){
      beforeEach(function(){
        cy.addBlog({
          title: 'What your monkey horoscope says about you',
          author: 'Baba Monkey Guru',
          url: 'www.monkeybible.com'
        })
      })
      it('user may like a blog he/she created', function(){
        cy.contains('What your monkey horoscope says about you')
          .parent()
          .find('.show')
          .click()
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })
      it('user may delete blog that he/she created', function(){
        cy.contains('What your monkey horoscope says about you')
          .parent()
          .find('.show')
          .click()
        cy.contains('Delete').click()
        cy.on('window:alert', str => {
          expect(str).to.equal('Do you really want to delete What your monkey horoscope says about you')
        })
        cy.should('not.contain', 'What your monkey horoscope says about you')
      })
      it('user may not delete blog that he/she did not create', function(){
        cy.contains('log out').click()
        cy.request('POST', 'http://localhost:3001/api/users/', {
          username: 'PunkMonk',
          name: 'Billy DarkMonkey',
          password: 'password'
        })
        cy.login({ username: 'PunkMonk', password: 'password' })
        cy.contains('What your monkey horoscope says about you')
          .parent()
          .find('.show')
          .click()
        cy.should('not.contain', 'Delete')
      })
      it.only('Blog articles are sorted by likes', function(){
        //create 2 additional blog articles
        cy.contains('Add a blog').click()
        cy.get('#title').type('The hottest covermonkeys of 2020')
        cy.get('#author').type('Cosmopolitan')
        cy.get('#url').type('cosmopolitan.com')
        cy.get('#add_blog').click()

        cy.contains('Add a blog').click()
        cy.get('#title').type('Kim Karmonkian - pregnant with twins!!')
        cy.get('#author').type('EMT')
        cy.get('#url').type('EMT.com')
        cy.get('#add_blog').click()
        //each article is liked a different amount of times
        cy.contains('What your monkey horoscope says about you')
          .parent()
          .find('.show')
          .click()
          .parent()
          .parent()
          .find('.like')
          .click()
          .click()

        cy.contains('Kim Karmonkian - pregnant with twins!!')
          .parent()
          .find('.show')
          .click()
          .parent()
          .parent()
          .find('.like')
          .click()

        //opens all toggles
        cy.contains('Show').click()
        //functiont to check that likes are in the rigth order?
        let num = 2
        cy.get('.extraInfo')
          .each(($el) => {
            expect($el).to.contain(`Likes: ${num}`)
            num = num -1
          })
      })
    })
  })
})
