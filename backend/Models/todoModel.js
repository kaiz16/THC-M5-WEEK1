const mongoose = require('mongoose')
// Constructing the todo schema
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, required: true }
})
const todoModel = mongoose.model('Todo', todoSchema)
module.exports = todoModel
