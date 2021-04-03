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

    describe('and a blog created by the logged in user exists', function () {
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

      it('it can be deleted', function () {
        cy.contains('View').click()
        cy.get('#delete-button').click()

        cy.contains('Test blog one').should('not.exist')
        cy.get('.success').should('contain', 'Blog has been deleted')
      })

      it('it cannot be deleted by another user', function () {
        cy.createUser({
          name: 'Silke Hofmann',
          username: 'silkeH',
          password: 'test'
        })

        cy.contains('Logout').click()
        cy.login({ username: 'silkeH', password: 'test' })

        cy.contains('Test blog one')
        cy.contains('View').click()
        cy.get('#delete-button').should('not.exist')
      })
    })

    describe('and several blog entries exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog one',
          author: 'Mr Best Author',
          url: 'www.testblog.de',
          likes: 2
        })
        cy.createBlog({
          title: 'Test blog two',
          author: 'Mr Best Author',
          url: 'www.testblog2.de'
        })
        cy.createBlog({
          title: 'Test blog three',
          author: 'Mr Best Author',
          url: 'www.testblog3.de',
          likes: 3
        })
      })

      it.only('the blogs are sorted according to likes in decending order', function () {
        cy.get('.bloglist').within(() => {
          cy.get('.blog').eq(0).contains('Test blog three')
          cy.get('.blog').eq(1).contains('Test blog one')
          cy.get('.blog').eq(2).contains('Test blog two')

          cy.get('.blog').eq(1).within(() => {
            cy.contains('View').click()
            cy.get('#like-button').click()
            cy.get('#like-button').click()
          })

          cy.wait(1000)
          cy.get('.blog').eq(0).contains('Test blog one')
          cy.get('.blog').eq(1).contains('Test blog three')
          cy.get('.blog').eq(2).contains('Test blog two')
        })
      })
    })
  })
})