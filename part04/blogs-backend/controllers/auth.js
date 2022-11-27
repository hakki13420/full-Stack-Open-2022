const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  const userLogin = await User.findOne({ username })
  if (!userLogin) return res.status(401).json({ error: 'unautorize user' })

  const credential = await bcrypt.compare(password, userLogin.password)
  if (!credential) return res.status(401).json({ error: 'unautorize user' })

  const jwtData = {
    id: userLogin.id,
    username: userLogin.username
  }
  const token = jwt.sign(jwtData, 'secret')
  return res.status(200).json({ token, username: userLogin.username, name: userLogin.name })
})

module.exports = router
