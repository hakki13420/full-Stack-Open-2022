
Cypress.Commands.add('login',(credential) => {
  cy.request('POST','http://localhost:3001/api/auth/login',credential)
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })

})

Cypress.Commands.add('logout',() => {
  cy.contains('logout').click()
})

Cypress.Commands.add('createBlog',(blog) => {
  cy.request({
    url:'http://localhost:3001/api/blogs',
    method:'POST',
    body:blog,
    headers:{
      Authorization:`bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
    }
  })
})

Cypress.Commands.add('createUser',user => {
  cy.request('POST','http://localhost:3001/api/users',user)
})


Cypress.Commands.add('resetUsers',() => {
  cy.request('GET','http://localhost:3001/api/testing/reset')
})
