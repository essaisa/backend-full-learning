// Address of this server connected to the network is:
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require('express')
const app = express()
const PORT = 8383

let data = ["Cole Palmer", "Ousmane Dembele"]

//Middleware -- In between two ends, expect to recieve JSON
app.use(express.json())


// Endpoint = HTTP VERBS (method which is the action) && ROUTES (or paths)
// Invoking method and configuring (coding), the method informs the nature of the request,
// The route is a further subdirectory (direct request to body of code and respond appropriately, routes / location are called endpoints)


// Type 1 – Website Endpoints (Sends HTML, usually used when user enters URL)
app.get('/', (req, res) => {
    console.log("User requested the home page")
    res.send(`
        <body
        style=" 
        background-color:pink;
        color:blue;"
        >

        <h1>Ball Knolly</h1>
        <a href="/dashboard">Dashboard</h3></a>

        <p> ${JSON.stringify(data)}</p> 
        </body> 
        <script>console.log("This is a cheeky script")</script>      
        `)
})

app.get('/dashboard', (req, res) => {
    res.send(`<body>
        <h1>Dashboard</h1> 
        <a href="/">Home</h3></a>
        </body>`)
})

// Type 2 – API Endpoints (non-visual)

// CRUD-method create-post read-get update-put delete-delete
app.get('/api/data', (req, res) => {
    console.log("This is for data");
    res.status(201).send(data)
})

app.post('/api/data', (req, res) => {
    // Someone wants to create a user (when the hit a sign up button)
    // Hit button after putting in their credentials, and their browser is wired up to send network req to server to handle action
    const newEntry = req.body
    console.log(newEntry.name)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log("Data is deleted")
    res.sendStatus(203)
})


app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`)
});





// NOTES
// nodemon -- dev dependency (--save-dev will add to devDependencies) -- regular updates server