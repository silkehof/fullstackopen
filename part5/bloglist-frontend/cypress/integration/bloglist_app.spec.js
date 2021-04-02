describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Welcome Matti Luukkainen')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(237, 37, 78)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog entry').click()
      cy.get('#title').type('How to write a blog')
      cy.get('#author').type('Mr. Knowitall')
      cy.get('#url').type('www.blog.fi')
      cy.contains('Save').click()

      cy.contains('How to write a blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog one',
          author: 'Mr Best Author',
          url: 'www.testblog.de'
        })
      })

      it('it can be liked', function () {
        cy.contains('View').click()
        cy.get('#like-button').click()

        cy.get('.likes')
          .should('contain', '1')
      })
    })
  })
})