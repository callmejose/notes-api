// require('dotenv').config()
// console.log(process.env)
const mongoose = require('mongoose')


// "URL": "mongodb+srv://api-test:${{ PASSWORD }}@cluster0.qzlffvu.mongodb.net/${{ DATABASE }}?retryWrites=true&w=majority"
const url = (process.env.MONGODB_URI).replace(
  "${{ PASSWORD }}",
  process.env.PASSWORD
).replace(
  "${{ DATABASE }}",
  'noteApp'
)

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)