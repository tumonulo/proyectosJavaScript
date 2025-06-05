import express from 'express'
export const app = express()

const PORT = process.env.PORT ?? 3000

import User from './userSchema.js'


// MongoDB Schema
// import { model, Schema } from 'mongoose'

// let userSchema = new Schema({
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//     avatarURL: { type: String }
// })

// export default model('User', userSchema)


app.use(express.json())

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})

        if (users.length === 0) {
            return res.status(404).json({ error: 'Users not found' })
        }

        const filtered = users.map(user => {
            const { password, ...rest } = user.toObject()
            return rest
        })

        return res.json(filtered)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users' })
    }
})

app.get('/users/:name', async (req, res) => {
    const { name } = req.params

    try {
        const user = await User.findOne({ name: name })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { password, ...rest } = user.toObject()
        return res.json(rest)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching user' })
    }
})

app.post('/users', async (req, res) => {
    const { name, password, avatarURL } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' })
    }

    try {
        const user = await User.create({
            name,
            password,
            avatarURL: avatarURL || ''
        })

        const { password, ...rest } = user.toObject()
        return res.json(rest)
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' })
    }
})

app.put('/users', async (req, res) => {
    const { name, password, avatarURL } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name is required' })
    }

    try {
        const user = await User.findOne({ name: name})

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        user.password = password || user.password
        user.avatarURL = avatarURL || user.avatarURL

        await user.save()

        const { password, ...rest } = user.toObject()
        return res.json(rest)
    } catch (error) {
        return res.status(500).json({ error: 'Error updating user' })
    }
})

app.delete('/users/:name', async (req, res) => {
    const { name } = req.params

    if (!name) {
        return res.status(400).json({ error: 'Name is required' })
    }

    try {
        const deletedUser = await User.findOneAndDelete({ name: name })

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        return res.json({ message: `User ${deletedUser.name} deleted successfully` })
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting user' })
    }
})

export const server = app.listen(PORT).then(() => 
    console.log(`Server listening on port http://localhost:${PORT}`)
)