import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in users
router.get('/', (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    res.json(todos)

})

// Create new todo
router.post('/', (req, res) => {
    const { task } = req.body

    try {
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`)
        const result = insertTodo.run(req.userId, task)

        res.json({ id: result.lastInsertRowid, task, complete: 0})

    
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

    console.log(task);
})

// Edit todo for user
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')

    updatedTodo.run(completed, id)

    res.json({ message: "Todo completed"})

})

router.delete('/:id', (req ,res) => {
    const { id } = req.params
    const userId = req.userId

    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id 
        = ?`)
    deleteTodo.run(id, userId)

    res.json({ message: "Todo deleted"})
})

export default router