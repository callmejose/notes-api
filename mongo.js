const mongoose = require('mongoose')
const MONGO = require('./secrets/mongoAtlas.json')

// "URL": "mongodb+srv://api-test:${{ PASSWORD }}@cluster0.qzlffvu.mongodb.net/${{ DATABASE }}?retryWrites=true&w=majority"
const url = MONGO.URL.replace(
    "${{ PASSWORD }}",
    MONGO.PASSWORD
).replace(
    "${{ DATABASE }}",
    'noteApp'
)
// const url =
//     `mongodb+srv://api-test:${password}@cluster0.qzlffvu.mongodb.net/noteApp?retryWrites=true&w=majority`

console.log(url)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'next note',
    date: new Date(),
    important: true,
})

//   note.save().then(result => {
//     console.log('note saved!', result)
//     mongoose.connection.close()
//   })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})