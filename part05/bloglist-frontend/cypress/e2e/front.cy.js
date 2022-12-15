
describe('blog app',function(){

  beforeEach(function (){
    cy.request('GET','http://localhost:3001/api/testing/reset')

    const user={
      name:'root',
      username:'root',
      password:'root'
    }

    cy.request('POST','http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('login form can be shown',function(){
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.contains('log in to application')
  })


  describe('login',() => {
    it('successs login with correct credential',() => {
      cy.contains('login').click()
      cy.get('input[name="username"]').type('root')
      cy.get('input[name="password"]').type('root')
      cy.contains('login').click()
      cy.contains('root logged in')
    })

    it('fail login with wrong credential',() => {
      cy.contains('login').click()
      cy.get('input:first').type('root')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()
      cy.contains('unautorize user')
      cy.get('.error')
        .should('be.visible')
        .should('have.css','color','rgb(255, 0, 0)')

    })

  })

  describe('when logged in',() => {
    beforeEach(() => {
      // cy.contains('login').click()
      // cy.get('input:first').type('root')
      // cy.get('input:last').type('root')
      // cy.contains('login').click()

      cy.login({
        username:'root',
        password:'root'
      })
      cy.get('.error').should('not.exist')
    })

    it('a blog can be created',() => {
      cy.contains('create').click()
      cy.get('input[name="title"]').type('blog title for cypress')
      cy.get('input[name="author"]').type('blog  author for cypress')
      cy.get('input[name="url"]').type('blog url for cypress')
      cy.contains('create').click()
      cy.contains('blog title for cypress')
    })

    it('a blog can be created only with logged users',() => {
      cy.createBlog({
        title:'title blog created with cypress request',
        author:'author blog created with cypress request',
        url:'url blog created with cypress request'
      })
      cy.visit('http://localhost:3000')
      cy.contains('title blog created with cypress request')
    })

    describe('likes when logged',() => {
      beforeEach(() => {
        cy.createBlog({
          title:'title blog one',
          author:'author blog one',
          url:'url blog one'
        })
        cy.createBlog({
          title:'title blog two',
          author:'author blog two',
          url:'url blog two'
        })
        cy.createBlog({
          title:'title blog three',
          author:'author blog three',
          url:'url blog three'
        })

      })

      it('a blog can be liked',() => {
        cy.visit('http://localhost:3000')
        cy.contains('title blog two')
          .parent().contains('view').click()
          .get('.likeBtn').click()
          .get('span').should('contain','1')
      })
    })


  })

})




describe('deleting blog',() => {

  const user1={
    username:'user1',
    password:'user1',
    name:'user1'
  }
  const user2={
    username:'user2',
    password:'user2',
    name:'user2'
  }
  const blog1={
    title:'title for delete test cypress 1',
    author:'author for delete test cypress 1',
    url:'url for delete test cypress 1'
  }
  const blog2={
    title:'title for delete test cypress 2',
    author:'author for delete test cypress 2',
    url:'url for delete test cypress 2'
  }
  const blog3={
    title:'title for delete test cypress 3',
    author:'author for delete test cypress 3',
    url:'url for delete test cypress 3'
  }
  beforeEach(() => {
    cy.resetUsers()
    cy.createUser(user1)
    cy.createUser(user2)
    cy.login(user1)
    cy.createBlog(blog1)
    cy.createBlog(blog2)
    cy.logout()
    cy.login(user2)
    cy.createBlog(blog3)
  })

  it('every user can delete his blogs',() => {
    cy.visit('http://localhost:3000')
    cy.contains('title for delete test cypress 3')
      .parent().contains('view').click()
      .get('.removeBtn')
      .click()

    cy.contains('title for delete test cypress 3')
      .should('not.exist')

  })

  it('a user cant delete a blog not created by him',() => {
    cy.visit('http://localhost:3000')
    cy.contains('title for delete test cypress 1')
      .parent().contains('view').click()
      .get('.removeBtn').should('not.exist')

  })




})

describe('asc and desc functionality test',() => {

  beforeEach(() => {
    cy.resetUsers()
    cy.createUser({
      name:'root',
      username:'root',
      password:'root'
    })
    cy.login({
      username:'root',
      password:'root'
    })

    for (let i=0; i<10;i++){
      cy.createBlog({
        title:`title asc-desc test ${i+1}`,
        author:`author asc-desc test ${i+1}`,
        url:`url asc-desc test ${i+1}`,
        likes:10-i
      })
    }

  })

  it('asc feature test',() => {
    cy.visit('http://localhost:3000')
    cy.contains('title asc-desc test 2')
    cy.contains('Asc').click()
    for (let i=0; i<10;i++){
      cy.get('.blogs .wrapper').eq(i).should('contain',`title asc-desc test ${10-i}`)
    }
  })

  it('desc feature test',() => {
    cy.visit('http://localhost:3000')
    cy.contains('title asc-desc test 9')
    cy.contains('Asc').click()
    cy.contains('Des').click()
    for (let i = 0; i < 10; i++) {
      cy.get('.blogs .wrapper')
        .eq(i).should('contain',`title asc-desc test ${i+1}`)
    }
  })

})