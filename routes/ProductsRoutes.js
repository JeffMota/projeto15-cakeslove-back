import { Router } from 'express'
import { betterSellers, listProducts } from '../controller/Product.js'
import { authorizationValidation } from '../middleware/AuthMiddleware.js'


const productRouter = Router()

// Rotas dos produtos
// Listar todos os produtos
// productRouter.use(authorizationValidation)
productRouter.get("/produtos", listProducts)

//Listar os mais vendidos / Por enquanto só retorna aleatóriamente
productRouter.get("/produtos/mais-vendidos", betterSellers)

export default productRouter