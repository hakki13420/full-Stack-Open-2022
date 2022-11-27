const mongoose = require('mongoose')
require('dotenv').config()

module.exports.connexionDb = () => {
  const connString = process.env.MODE_ENV === 'development'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_TEST

  return mongoose.connect(connString)
    .then(() => console.log('connected to database'))
    .catch(err => console.log(`database error connexion : ${err}`))
}
