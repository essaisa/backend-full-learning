import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5000

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

// Routes (Prefix will be Auth)

app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})