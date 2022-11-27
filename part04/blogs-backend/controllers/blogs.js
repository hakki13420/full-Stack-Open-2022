const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
// const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    return res.status(200).json(blogs)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (!blog) { return res.status(404).json({ error: 'not found' }) }
      return res.status(200).json(blog)
    })
    .catch(err => next(err))
})

router.put('/:id', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title, author, url, likes
    }, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    if (!blog) { return res.status(404).json({ error: 'not found' }) }
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    // const credential = jwt.verify(req.token, process.env.SECRET)

    const blog = await Blog.findByIdAndRemove(req.params.id)

    if (!blog) { return res.status(404).json({ error: 'not found' }) }
    if (blog.user.toString() !== req.user) return res.status(401).json({ error: 'no authorized' })
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.post('/', userExtractor, async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body
    // const token = getTokenFromReq(req)
    // const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.user) return res.status(401).json({ error: 'credential error!invalid token' })
    const userBlog = await User.findById(req.user)
    const blog = new Blog({
      title,
      author,
      user: userBlog.id,
      url,
      likes
    })
    const newBlog = await blog.save()
    userBlog.blogs = [...userBlog.blogs, newBlog.id]
    await userBlog.save()

    res.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
