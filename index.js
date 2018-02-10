const express = require('express')
const app = express()
app.use(express.static('build'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const Person = require('./models/person')


var morgan = require('morgan')
morgan.token('person', function getPerson(req){
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :person  :status :res[content-length] - :response-time ms'))

/*
let persons= [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]
  */
const generateId = () =>{
    return ('', Math.random().toString(36).substr(2,9))
    /*
    const id = Math.floor(Math.random()*(persons.length*100)+5 )
    const onkoOlemassa = persons.find(person => person.id === id)
    if(onkoOlemassa){
        return generateId()
    }else{
        return id
    }
    */
    
}
app.get('/', (req, res) => {
    res.send(build/index.html)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(body.name === "" ){
        return res.status(400).json({error: 'name missing'})
    }
    if( body.number === ""){
        return res.status(400).json({error: 'number missing'})
    }
    
    
    if(Person.find(person => person.name === body.name)){
        return res.status(400).json({error: 'name must be unique'})
    }
    
    const person = new Person({
        name: body.name,
        number: body.number,
        id:generateId()
    })
    person
    .save()
    .then(savedPerson => {
        res.json(formatPerson(savedPerson))
    })
    
    
    
    
})

app.get('/info', (req, res) =>{
    
    console.log(persons);
    
    var maara = persons.length
    console.log(maara);
    const date = new Date()
    res.send(`<p>puhelin luettelossa  ${maara}  henkilön tiedot </p>
    <p>${date}</p>`)

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get('/api/persons/:id', (req, res) =>{

    Person
    .findById(req.params.id)
    .then(person => {
        res.json(formatPerson(person))
    })
   
})

const formatPerson = (person) =>{
    return{
        name: person.name,
        number: person.number,
        id: person._id
    }
}
app.get('/api/persons', (req, res) =>{
    Person
    .find({})
    .then(persons => {
        res.json(persons.map(formatPerson))
    })
    
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
