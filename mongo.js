
const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://fullstack:*****@ds229008.mlab.com:29008/fullstack-persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: String
})
/*
const person = new Person({
    name: "Kalle",
    number: "123",
    id: "55"
})
*/
/*
person
  .save()
  .then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
  */
  const generateId = () =>{
    return ('', Math.random().toString(36).substr(2,9)) 
    
}
  
  if(process.argv[2] !== undefined && process.argv[3] !== undefined){
      
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3],
        id: generateId()
    })

    person
  .save()
  .then(response => {
    console.log(`lisätään henkilö ${process.argv[2]} numero ${process.argv[3]} `)
    mongoose.connection.close()
  })
  
  }
  else{
    Person
  .find({})
  .then(result => {
      console.log('puhelinluettelo: ');
      
      result.forEach(person => {
        
        
        console.log(`${person.name} ${person.number}`);
        
      })
      mongoose.connection.close()
  })
}