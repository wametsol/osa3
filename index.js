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


app.get('/api/persons', (req, res) =>{
    
    res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
