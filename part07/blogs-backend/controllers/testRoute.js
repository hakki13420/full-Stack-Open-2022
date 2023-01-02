const router = require('express').Router()
const User = require('../models/User')
const Blog = require('../models/Blog')

router.get('/reset', async (req, res, next) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})
    return res.status(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
