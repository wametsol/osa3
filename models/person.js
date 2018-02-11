const mongoose = require('mongoose')
const url = process.env.MONGO_URL
 
mongoose.connect(url)
const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: String
  })

  const formatPerson = (person) =>{
    return{
        name: person.name,
        number: person.number,
        id: person._id
    }
}
  
module.exports = Person