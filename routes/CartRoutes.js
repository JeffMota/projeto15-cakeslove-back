import { Router } from 'express'
import { addProductCart, delProductCart, getUserCart } from '../controller/Cart.js'
import { authorizationValidation } from '../middleware/AuthMiddleware.js'

const cartRouter = Router()

cartRouter.use(authorizationValidation)
cartRouter.get("/carrinho", getUserCart)
cartRouter.post("/carrinho", addProductCart)
cartRouter.delete("/carrinho", delProductCart)

export default cartRouter