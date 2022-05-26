const result = require('dotenv').config()
console.log('env: ', result)

const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hola express</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
        console.log(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important ?? false,
        date: new Date().toISOString(),
        id: generateId()
    }
    console.log(note)

    notes = notes.concat(note)
    response.json(note)
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)