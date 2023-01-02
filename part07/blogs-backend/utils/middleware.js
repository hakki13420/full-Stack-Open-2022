const jwt = require('jsonwebtoken')

module.exports.unknow = (req, res) => {
  res.status(404).send('not found')
}

module.exports.errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports.tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7)
    req.token = token
  }
  next()
}

module.exports.userExtractor = (req, res, next) => {
  const credential = jwt.verify(req.token, process.env.SECRET)
  if (credential) req.user = credential.id
  next()
}
