const mongoose = require('mongoose')
// const { server } = require('../index')
const { app } = require('../app')
const Blog = require('../models/Blog')
const { initialBlogs, allBlogsInDB, noExistingId } = require('./helpers/test_helper')

const supertest = require('supertest')
const User = require('../models/User')

const api = supertest(app)
let token = null

beforeAll(async () => {
  await User.deleteMany({})
  const adminTest = {
    name: 'root',
    username: 'root',
    password: 'root'
  }
  await api.post('/api/users')
    .send(adminTest)
    .expect(201)

  const res = await api.post('/api/auth/login')
    .send({ username: 'root', password: 'root' })
    .expect(200)
  token = res.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
}, 100000)
//= ===========================================
describe('blogs api test with saved initial blogs', () => {
  test('blogs returned en json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id returned is defined', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.map(blog => expect(blog.id).toBeDefined())
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length)
  })

  it('a specefic blog is within returned blogs', async () => {
    const res = await api.get('/api/blogs')
    const titles = res.body.map(response => response.title)
    expect(titles).toContain(initialBlogs[0].title)
  })
})
//= =============================
describe('view a specefic blog', () => {
  test('success with valid id', async () => {
    const res = await api.get('/api/blogs')
    const blogToView = res.body[0]
    const blogView = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogView.body).toEqual(blogToView)
  })

  test('404 with with valid id', async () => {
    const newBlog = new Blog({
      title: 'specific title to delete',
      author: 'specific author to delete',
      url: 'specific url to delete'
    })
    await newBlog.save()
    await newBlog.remove()

    api.get(`/api/blogs/${newBlog.id}`)
      .expect(404)

    console.log('id del', newBlog.id)
  })

  test('400 with invalid id', async () => {
    const invalidId = 333333
    api.get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})
//= ==========================================
describe('addition blogs', () => {
  test('add valid blog', async () => {
    const newBlog = {
      title: 'add test blog',
      author: 'author test add blog',
      url: 'url test add blog',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await allBlogsInDB()
    const titles = blogs.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
    expect(blogs).toHaveLength(initialBlogs.length + 1)
  })

  test('add likes=0 as default', async () => {
    const newBlog = {
      title: 'add test blog like 0',
      author: 'author test add blog like 0',
      url: 'url test add blog like 0'
    }
    const blog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
    expect(blog.body.likes).toBe(0)
  })

  test('add no valid blog', async () => {
    const newBlog = {
      // author: 'author test add blog',
      url: 'url test add blog'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogs = await allBlogsInDB()
    expect(blogs).toHaveLength(initialBlogs.length)
  })
})

//= =========================================
describe('deletion test', () => {
  test('can delete blog with valid id if user is the owner', async () => {
    const blogToDelete = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'test deletion blog title',
        author: 'test deletion blog author',
        url: 'test deletion blog url'
      })
      .expect(201)
    const blogs = await allBlogsInDB()

    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    const blogsAfterDelete = await allBlogsInDB()
    expect(blogsAfterDelete).toHaveLength(blogs.length - 1)
  })

  test('delete invalid id', async () => {
    const invalidId = await noExistingId()
    console.log(invalidId)
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })
})

describe('updating blogs', () => {
  test('updating blog with valid id', async () => {
    const blogToUpdate = {
      title: 'blog title to update',
      author: 'blog title to update author',
      url: 'blog title to update url',
      likes: 444444
    }
    const blogs = await allBlogsInDB()
    const id = blogs[0].id
    const blogUpdated = await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(200)
    console.log('blogUpdated     ', blogUpdated.body)
    delete blogUpdated.body.id
    expect(blogUpdated.body).toEqual(blogToUpdate)
  })
  test('updating blog with non valid id', async () => {
    const blogToUpdate = {
      title: 'blog title to update',
      author: 'blog title to update author',
      url: 'blog title to update url',
      likes: 444444
    }
    const id = 2222222
    const blogUpdated = await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(400)
    delete blogUpdated.body.id
    expect(blogUpdated.body).not.toEqual(blogToUpdate)
  })
  test('updating blog with non no existing id', async () => {
    const blogToUpdate = {
      title: 'blog title to update',
      author: 'blog title to update author',
      url: 'blog title to update url',
      likes: 444444
    }
    const id = await noExistingId()
    await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(404)
  })
})

//= ===========================
afterAll(async () => {
  await mongoose.disconnect()
//  await server.close()
}, 100000)
