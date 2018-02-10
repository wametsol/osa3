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


const generateId = () =>{
    return ('', Math.random().toString(36).substr(2,9))
  
    
}
app.get('/', (req, res) => {
    res.send(build/index.html)
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body);
    
    if(body.name === "" ){
        return res.status(400).json({error: 'name missing'})
    }
    if( body.number === ""){
        return res.status(400).json({error: 'number missing'})
    }
    
    /*
    if(Person.find(person => person.name === body.name)){
        return res.status(400).json({error: 'name must be unique'})
        .catch(error => {
            console.log(error);
            
        })
    }
    */
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
    
    const date = new Date()
    Person
    .find({})
    .then(persons => {
        console.log(persons.length);
        res.send(`<p>puhelin luettelossa  ${persons.length}  henkilön tiedot </p>
        <p>${date}</p>`)
        
    })
  

})

app.delete('/api/persons/:id', (req, res) => {
    Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => {
        res.status(400).send({error: 'malformatted id'})
    })
})

app.get('/api/persons/:id', (req, res) =>{

    Person
    .findById(req.params.id)
    .then(person => {
        if(person){
            res.json(formatPerson(person))
        }else{
            res.status(404).end()
        }
        
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({error: 'malformatted id'})
        
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
        console.log(persons.length);
        
        res.json(persons.map(formatPerson))
    })
    
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
