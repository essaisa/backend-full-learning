import express from "express"
import path, {dirname} from "path"
import { fileURLToPath } from "url"


const app = express()
const PORT = process.env.PORT || 5003

// GET FILE PATH FROM URL FROM CURRENT MODULE
const __filename = fileURLToPath(import.meta.url)

// GET DIRECTORY NAME FROM THE FILE PATH
const __dirname = dirname(__filename)

// MIDDLEWARE
app.use(express.json())

// Serves HTML file from /public dir
// Tells express to serve all files from public folder as static assets / files
// Any request for the css files will be resolved to the public dir

app.use(express.static(path.join(__dirname, '../public')))

// Sending HTML file from /public dir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})