const supertest = require('supertest')
const { app } = require('../app')
const User = require('../models/User')
const { allUsersInDB } = require('./helpers/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const initUser = {
    name: 'root',
    username: 'root',
    password: 'root'
  }
  const user = new User(initUser)
  await user.save()
})

describe('users with initial data', () => {
  test('users returned in json form', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('id returned id defined', async () => {
    const users = await allUsersInDB()
    users.map(user => expect(user.id).toBeDefined())
  })
})
describe('users api addition', () => {
  test('fail to add a existing user', async () => {
    const users = await allUsersInDB()
    await api
      .post('/api/users')
      .send({
        name: 'name',
        username: users[0].username,
        password: 'password'
      })
      .expect(400)
    const usersAfter = await allUsersInDB()
    expect(usersAfter).toHaveLength(users.length)
    const usernames = usersAfter.filter(user => user.username === users[0].username)
    expect(usernames).toHaveLength(1)
  })
  test('add a valid user', async () => {
    const users = await allUsersInDB()
    await api
      .post('/api/users')
      .send({
        name: 'name',
        username: 'username',
        password: 'password'
      })
      .expect(201)
    const usersAfter = await allUsersInDB()
    expect(usersAfter).toHaveLength(users.length + 1)
    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain('username')
  })
  test('fail to add user with no valid password empty', async () => {
    const users = await allUsersInDB()
    await api
      .post('/api/users')
      .send({
        name: 'name with empty pw',
        username: 'username with empty pw',
        password: ''
      })
      .expect(400)
    const usersAfter = await allUsersInDB()
    expect(usersAfter).toHaveLength(users.length)
    const usernames = usersAfter.map(user => user.username)
    expect(usernames).not.toContain('username with empty pw')
  })
  test('fail to add user with no valid password less than 3 carcters', async () => {
    const users = await allUsersInDB()
    await api
      .post('/api/users')
      .send({
        name: 'name with pw less than 3',
        username: 'username with  pw less than 3',
        password: 'ab'
      })
      .expect(400)
    const usersAfter = await allUsersInDB()
    expect(usersAfter).toHaveLength(users.length)
    const usernames = usersAfter.map(user => user.username)
    expect(usernames).not.toContain('username with  pw less than 3')
  })
})
