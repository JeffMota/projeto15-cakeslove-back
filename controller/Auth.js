import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'



export async function signUp(req, res) {
    const user = res.locals.user

    const passwordHashed = bcrypt.hashSync(user.password, 10)

    try {
        
        await db.collection("users").insertOne({...user, password: passwordHashed })

        res.status(201).send("usuário cadastrado")

    } catch(error) {
        res.status(500).send(error.message)
    }
}


export async function signIn(req, res) {
    const user = res.locals.user

    try {
        const token = uuidV4();

        const teste = await db.collection("sessions").insertOne({ user: user._id, token})

        return res.status(200).send({ token })

    } catch (error) {
        res.status(500).send(error.message)
    }
}