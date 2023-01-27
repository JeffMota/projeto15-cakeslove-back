import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'
import { ObjectId } from 'mongodb'


export async function signUp(req, res) {
    const user = res.locals.user

    const passwordHashed = bcrypt.hashSync(user.password, 10)

    try {

        await db.collection("users").insertOne({ name: user.name, email: user.email, password: passwordHashed })

        res.status(201).send("usuário cadastrado")

    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function signIn(req, res) {
    const user = res.locals.user

    try {

        const alreadyExist = await db.collection('sessions').findOne({ user: ObjectId(user._id) })

        if (alreadyExist) {
            const token = uuidV4();

            await db.collection('sessions').updateOne(
                {
                    _id: ObjectId(user._id)
                },
                {
                    $set: {
                        user: user._id,
                        token
                    }
                }
            )
            return res.status(200).send({ token })
        }

        const token = uuidV4();

        const teste = await db.collection("sessions").insertOne({ user: user._id, token })

        return res.status(200).send({ token })

    } catch (error) {
        res.status(500).send(error.message)
    }
}