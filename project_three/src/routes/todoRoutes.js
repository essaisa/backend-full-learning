import express from 'express'
import prisma from '../prismaClient.js'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in users
router.get('/', async (req, res) => {
    const todos = await prisma.todos.findMany({
        where: {
            userId: req.userId
        }
    })
    
    res.json(todos)
})

// Create new todo
router.post('/', async (req, res) => {
    const { task } = req.body

    try {
        const todo = await prisma.todos.create({
            data: {
                task,
                userId: req.userId
            }
        })
        res.json(todo)


    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

    console.log(task);
})

// Edit todo for user
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = await prisma.todos.updateMany({
        where: {
            id: parseInt(id),
            userId: req.userId,
        },
        data : {
            completed: !!completed
        }
    })

    res.json(updatedTodo)
})

router.delete('/:id', async (req ,res) => {
    const { id } = req.params
    const userId = req.userId

    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    }
    )
    res.json({ message: "Todo deleted"})
})

export default router