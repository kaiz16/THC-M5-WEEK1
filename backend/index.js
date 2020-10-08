/*
@GET to get the data
@POST to add new data
@PUT to update existing data
@DELETE to delete data
Every request can accept two parameters (request and response) 
@request to get request data from client
@response to send information back to the client

@status
@200 means OK
@404 means NOT FOUND
@504 means SERVER ERROR

@https://www.restapitutorial.com/httpstatuscodes.html
*/

const express = require('express')
const mongoose = require('mongoose')
// requiring our mock database to store todos
// const data = require('./todo')
const todoModel = require('./Models/todoModel')

/* 
we require cors to enable cross-origin resource sharing
this server is run on port 8000 (@http://localhost:8000)
the frontend application is running on port 8080 (@http://localhost:8080)
Their origin are not same. 
*/
var cors = require('cors')
// var corsOptions = {
// we tell cors here we only want to serve to this url
// any request from other urls are not allowed (for security purpose)
// origin: 'http://localhost:8080',
// optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) act weird on 204
// }
// make express instance
const app = express()
// tell express to use our configured CORS
app.use(cors())
// tell express to use json as well 
app.use(express.json());

/*
@GET request to root route @http://localhost:8000 will return all todos in JSON format
*/
app.get('/', (req, res) => {
    // responding with the JSON data ( contains TODOS ) along with status 200
    // res.status(200).json(data)
    todoModel.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json(err))
})

/*
@POST request to /add route @http://localhost:8000/add
will add a new todo to our database
*/
app.post('/add', (req, res) => {
    /* 
    try/catch for better error handling
    request can have body property that contains datas from client
    See frontend app to see what kind of data we are sending from client
    // */
    // try {
    // In this case, our request body contains new todo object 
    // Push this new todo to our existing database
    // data.Todos.push(req.body.todo)
    // res.status(200).json(data.Todos)

    // } catch (error) {
    // send back 504 status if there's any error
    // console.log(error)
    // res.status(504).send()
    // }
    // send 200 status if successful
    // console.log(data.Todos)
    // res.status(200).send(data.Todos)
    // Adding todo in the database
    const newTodo = new todoModel({
        text: req.body.todo.text,
        completed: req.body.todo.completed
    })
    newTodo.save()
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(err))
})

/*
@PUT request to root route @http://localhost:8000
will change a todo completed flag
will change it to true if false
will change it to false if true
*/
app.put('/update', (req, res) => {
    todoModel.findByIdAndUpdate(req.body._id, { completed: true }, { new: true })
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(err))
})

/*
@DELETE request to root route @http://localhost:8000
will delete a todo from our database
*/
app.delete('/delete/:id', (req, res) => {
    todoModel.findByIdAndDelete(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json(err))
})

/*
@DELETE request to /removeCompletedTodos route @http://localhost:8000/removeCompletedTodos
will clear all completed todos
*/
app.delete('/removeCompletedTodos', (req, res) => {
    /*
        In here, we don't use any data from request body,
        A delete request to this route will delete the todos that are completed
    */
    // console.log('Hit the end point')
    todoModel.deleteMany({ completed: true }, {})
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json(err))
})
// Paste your Mongo DB connection string to connect to your Mongo DB 
// Connecting to Mongo DB Atlas
mongoose.connect('Mongo DB Connection String', {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false
})
// Istantiating the db connection instance
let db = mongoose.connection;
// Once connected to mongo db the message will be logged.
db.on('open', () => {
    console.log('Connected to Database')
})

// tell express that we want to listen for requests at port 8000
// this starts the express server
app.listen(8000, function () {
    console.log('App is listening on port 8000')
});
