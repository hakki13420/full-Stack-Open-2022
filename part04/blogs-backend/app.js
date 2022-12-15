const express = require('express')
const cors = require('cors')
const { connexionDb } = require('./utils/conn')
const blogRoutes = require('./controllers/blogs')
const userRoutes = require('./controllers/users')
const authRoutes = require('./controllers/auth')
const { tokenExtractor } = require('./utils/middleware')

const { unknow, errorHandler } = require('./utils/middleware')

const app = express()
// connexion database
connexionDb()

// middlwares
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

// routes

app.get('/', (req, res) => {
  res.redirect('/api/blogs')
})

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

if (process.env.MODE_ENV === 'test') {
  console.log('server running en mode test')
  const resetRoute = require('./controllers/testRoute')
  app.use('/testing', resetRoute)
}

app.use(unknow)

app.use(errorHandler)

module.exports = { app }
