// Address of this server connected to the network is:
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require('express')
const app = express()
const PORT = 8383

console.log("EMONEY")

// HTTP VERBS &&
app.get('/', (req, res) => {
    res.send("EMONEY")
})

app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`)
});












// NOTES
// nodemon -- dev dependency (--save-dev will add to devDependencies) -- regular updates server