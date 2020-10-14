const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
// Instantaiting express app.
const app = express()
// Enabling cors
app.use(cors())
// tell express to use json as well 
app.use(express.json({ extended: false }));
// Connecting to Mongo DB
mongoose.connect(process.env.MongoDB, {
    useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false
})
// Istantiating the db connection instance
let db = mongoose.connection;
// Once connected to mongo db the message will be logged.
db.on('open', () => {
    console.log('Connected to Database')
})

// Deploying our app 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))
    // To handle SPA routing
    app.get('/.*/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    })
}

app.use('/api', require('./routes/todoApi'))

const port = process.env.PORT || 8000

app.listen(port, function () {
    console.log('App is listening on port ' + port)
});
