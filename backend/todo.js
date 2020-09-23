/* Mocking database
In real world, you might use MongoDB or some other databases. 
Your records would have some kind of a unique ID to identify each record
/*/
const Todos = [
    {
        text: "Walk my dog",
        completed: false
    },
    {
        text: "Walk my cat",
        completed: true
    }
]


// exporting this to use it in our express server
module.exports = {
    Todos
}