// Address of this server connected to the network is:
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require('express')
const app = express()
const PORT = 8383
let data = {
    player: "Ousmane Dembele"
    }

console.log("EMONEY")

// Endpoint = HTTP VERBS (method which is the action) && ROUTES (or paths)
// Invoking method and configuring (coding), the method informs the nature of the request,
// The route is a further subdirectory (direct request to body of code and respond appropriately, routes / location are called endpoints)


// Type 1 – Website Endpoints (Sends HTML, usually used when user enters URL)
app.get('/', (req, res) => {
    res.send(`
        <body
        style=" 
        background-color:pink;
        color:blue;"
        >
        <h1>Players</h1>
        <p> ${JSON.stringify(data)}</p> 
        </body>       
        `)
})

app.get('/dashboard', (req, res) => {
    res.send("<h1>Dashboard</h1> ")
})

// Type 2 – API Endpoints (non-visual)

// CRUD-method create-post read-get update-put delete-delete
app.get('/api/data', (req, res) => {
    console.log("This is for data");
    res.send(data)
})


app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`)
});





// NOTES
// nodemon -- dev dependency (--save-dev will add to devDependencies) -- regular updates server