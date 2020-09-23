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

// requiring our mock database to store todos
const data = require('./todo')


/* 
we require cors to enable cross-origin resource sharing
this server is run on port 8000 (@http://localhost:8000)
the frontend application is running on port 8080 (@http://localhost:8080)
Their origin are not same. 
*/
var cors = require('cors')
var corsOptions = {
    // we tell cors here we only want to serve to this url
    // any request from other urls are not allowed (for security purpose)
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) act weird on 204
}
// make express instance
const app = express()
// tell express to use our configured CORS
app.use(cors(corsOptions))
// tell express to use json as well 
app.use(express.json());

/*
@GET request to root route @http://localhost:8000 will return all todos in JSON format
*/
app.get('/', (req, res) => {
    // responding with the JSON data ( contains TODOS ) along with status 200
    res.status(200).json(data)
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
    */
    try {
        // In this case, our request body contains new todo object 
        // Push this new todo to our existing database
        data.Todos.push(req.body.todo) 
    } catch (error) {
        // send back 504 status if there's any error
        res.status(504).send()
    }
    // send 200 status if successful 
    res.status(200).send()
})

/*
@PUT request to root route @http://localhost:8000
will change a todo completed flag
will change it to true if false
will change it to false if true
*/
app.put('/', (req, res) => {
    try {
        /* Our request body 
        has the index of the todo we want to update
        */
        data.Todos[req.body.index].completed = !data.Todos[req.body.index].completed
    } catch (error) {
        res.status(504).send()
    }
    res.status(200).send()
})

/*
@DELETE request to root route @http://localhost:8000
will delete a todo from our database
*/
app.delete('/', (req, res) => {
    try {
        /* Our request body 
        has the index of the todo we want to delete
        */
        // Delete it using JS built-in splice function
        data.Todos.splice(req.body.index, 1)
    } catch (error) {
        res.status(404).send()
    }
    res.status(200).send()
})

/*
@DELETE request to /removeCompletedTodos route @http://localhost:8000/removeCompletedTodos
will clear all completed todos
*/
app.delete('/removeCompletedTodos', (req, res) => {
    /*
        In here, we don't use any data from request body,
        A delete request to this route will update the todos that are completed
    */
    try {
        // Filter out todos that are completed.
        data.Todos = data.Todos.filter( todo => {
            if (todo.completed == false){
              return todo
            }
        }) 
    } catch (error) {
        res.status(504).send()
    }
    res.status(200).send()
})

// tell express that we want to listen for requests at port 8000
// this starts the express server
app.listen(8000, function () {
    console.log('App is listening on port 8000')
});