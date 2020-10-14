const express = require('express')
const router = express.Router()
const todoModel = require('../Models/todoModel')

// Getting all the todos.
router.get('/', (req, res) => {
    todoModel.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json(err))
})
// Creating a todo
router.post('/add', (req, res) => {
    const newTodo = new todoModel({
        text: req.body.todo.text,
        completed: req.body.todo.completed
    })
    newTodo.save()
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(err))
})
// Updating a Todo
router.put('/update', (req, res) => {
    todoModel.findByIdAndUpdate(req.body._id, { completed: true }, { new: true })
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(err))
})
// Deleting a Todo
router.delete('/delete/:id', (req, res) => {
    todoModel.findByIdAndDelete(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(err))
})
// Deleting the completed todos.
router.delete('/removeCompletedTodos', (req, res) => {
    todoModel.deleteMany({ completed: true }, {})
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json(err))
})

module.exports = router