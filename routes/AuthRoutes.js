
import { Router } from 'express'
import { signIn, signUp } from '../controller/Auth.js'
import { signInValidation, signUpValidation } from '../middleware/AuthMiddleware.js'


const authRouter = Router()

authRouter.post("/sign-up", signUpValidation, signUp)
authRouter.post("/sign-in", signInValidation, signIn)

export default authRouter  

