import express from 'express'
export const app = express()

const PORT = process.env.PORT ?? 3000

import User from './userSchema.js'




// mongoDB Schema
// import { model, Schema } from 'mongoose'

// let userSchema = new Schema({
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//     avatarURL: { type: String }
// })

// export default model('User', userSchema)



app.get('/items', async (req, res) => {
    try {
        const users = await User.find({})

        if (!users.length === 0) {
            return res.status(404).json({ error: 'Users not found' })
        }

        const filtered = users.map(({ password, ...rest }) => rest)
        return res.json(filtered)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users' })
    }
})

app.get('/items/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.find({ _id: id })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { password, ...rest } = user
        return res.json(rest)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching user' })
    }
})

app.get('/items/:name', async (req, res) => {
    const { name } = req.params
    try {
        const user = await User.find({ name: name })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { password, ...rest } = user
        return res.json(rest)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching user' })
    }
})

app.post('/items', async (req, res) => {
    const { name, password, avatarURL } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'Name or password not provided' })
    }

    try {
        const newUser = await User.create({
            name,
            password,
            avatarURL: avatarURL || ''
        })

        res.json(userObj)
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
});


export const server = app.listen(PORT).then(() => 
    console.log(`Server listening on port http://localhost:${PORT}`)
)