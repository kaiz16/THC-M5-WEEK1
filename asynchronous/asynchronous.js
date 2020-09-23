// self executing function
(async () => {
    // returns a promise 
    // resolve gets executed when there's data
    // reject gets executed when there's error
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
                resolve(data)
            }, 2000)
        })  
    }
    
    // returns a promise 
    // resolve gets executed when there's data
    // reject gets executed when there's error
    function getTodosForUser( userData ) {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                const todos = [1,2,3,4,5]
    
                if (todos){
                    resolve(todos)
                }
                reject()
            }, 2000)
        } )
    }
    
    // at first userdata & todos are undefined
    let userData = undefined;
    let todos = undefined;
    try {
        // wait for the user to finish loggin in
        userData = await loginUser();
    } catch (error) {
        // catch if there's any error and halt the execution
       console.log(error) 
       return
    }
    
    try {
        // once we have the data for user, find their todos item
        todos = await getTodosForUser(userData);
    } catch (error) {
        // catch if there's any error. (DON'T HALT THE EXECUTION)
        console.log(error) 
    }
    // show todos
    console.log(todos);
})();
