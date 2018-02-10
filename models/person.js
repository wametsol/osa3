const mongoose = require('mongoose')
const url = 'mongodb://fullstack:**@ds229008.mlab.com:29008/fullstack-persons'
mongoose.connect(url)
const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: String
  })
module.exports = Person