import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
    // Save username and unreversible encrypted pass to db

    // encryt passwprd
    const {username , password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    // save new user and hashed password to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // now that we have a user, I want to add their first todo for them 
        const defaultTodo = `Yo! Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })
        
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

    console.log(hashedPassword);
    res.sendStatus(201)
})

router.post('/login', (req, res) => { 
    // we get email and lookup associated pass with email in db
    // but we get it back encrypted, which we cant compare it one user entered, therefore we one-way encrypt the 
    // pass the user just entered

    const {username, password} = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        // if user doesn't exist return out from function

        if (!user) {
            res.sendStatus(404).send({message: "User Not Found"})
        }
        
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        // if pass dont match, return out from function

        if (!passwordIsValid){
            res.sendStatus(404).send({message: "Password is Invalid!"})
        }

        console.log(user)

        // successful auth
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({ token })
        
    } catch (err) {
        console.log(err)
        res.sendStatus(503)
    }
})

export default router