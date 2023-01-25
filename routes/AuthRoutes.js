
import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"



const authRouter = Router()

// Rotas de autenticação
authRouter.post("/sign-up")
authRouter.post("/sign-in")

export default authRouter  