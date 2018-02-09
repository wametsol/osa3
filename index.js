const express = require('express')
const app = express()
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
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
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
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){

        //res.json(person)
        res.send(`<p>Nimi:  ${person.name}</p>
                  <p>Numero: ${person.number}</p>`)
    }else {
        res.status(404).end()
    }
})


app.get('/api/persons', (req, res) =>{
    
    res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
