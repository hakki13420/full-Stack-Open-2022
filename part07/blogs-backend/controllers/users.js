const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
      .select({ name: true, username: true, password: true, blogs: true })
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body
    const user = await User.findOne({ username })
    if (user) return res.status(400).json({ error: 'user exist try other one' })
    if (!password || password.length < 3) return res.status(400).json({ error: 'password incorrect' })
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      name, username, password: hashedPassword
    })
    await newUser.save()
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router
