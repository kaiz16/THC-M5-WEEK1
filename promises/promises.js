console.log('start')

function loginUser(){
    return new Promise( (resolve, reject ) => {
        setTimeout( () => {
            const data = {
                name: "John",
                email: "John@mcdonald.com",
                id: 1
            }
           
            if (!data){
                reject()
            }
            console.log("Successfully logged the user in")
            resolve(data)
        }, 2000)
    })  
}

function getTodoDetails(todo){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const detail = "Details of todo item 1"
            if (detail){
                console.log("We got the details for todo item 1")
                resolve(detail)
            }
            reject()
        }, 2000)
    })
}

function getTodos () {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            const todos = [1,2,3]
            if (todos){
                console.log("we got the todos for this user")
                resolve(todos)
            }
            reject()
        }, 2000)
    })
}

// promise hell
// 1) Login user
// 2) Get todos for this user
// 3) Get details for the todo item 1
loginUser().then( userData => {
    getTodos().then( ( todos ) => {
        getTodoDetails(todos[0]).then( detail => {
            console.log(detail)
        })
    })
})

console.log('end')