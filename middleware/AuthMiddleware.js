import db from '../config/database.js'
import bcrypt from 'bcrypt'
import { registrationUserSchema } from '../schema/AuthSchema.js'
import { ObjectId } from 'mongodb'

export async function signUpValidation(req, res, next) {
  const user = req.body

  const { error } = registrationUserSchema.validate(user, { abortEarly: false })

  if (error) {
    const errors = error.details.map(detail => detail.message)
    return res.status(400).send(errors)
  }

  const checkUser = await db.collection("users").findOne({ email: user.email })
  if (checkUser) return res.status(409).send('Esse usuário já existe')

  res.locals.user = user

  next()

}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body

  try {
    const user = await db.collection("users").findOne({ email })

    if (!user) return res.status(401).send('Não autorizado')

    const passwordIsCorrect = bcrypt.compareSync(password, user.password)

    if (!passwordIsCorrect) return res.status(401).send('Não autorizado')

    res.locals.user = user
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Houve um problema no servidor')
  }

  next()
}

export async function authorizationValidation(req, res, next) {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).send("Não autorizado")
  const token = authorization?.replace("Bearer ", "")

  if (!token) return res.status(401).send("Não autorizado")

  try {
    const checkSession = await db.collection("sessions").findOne({ token })
    if (!checkSession) return res.status(401).send("Não autorizado")

    const user = await db.collection("users").findOne({ _id: ObjectId(checkSession.user) })
   
    if (!user) return res.status(401).send("Não autorizado aqui")

    res.locals.user = user

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Houve um problema no servidor")
  }

  next()

}