import { Router } from 'express'
import { betterSellers, listProducts, registerProduct } from '../controller/Product.js'
import { authorizationValidation } from '../middleware/AuthMiddleware.js'
import validateSchema from '../middleware/ValidateSchema.js'
import { productSchema } from '../schema/ProductSchema.js'


const productRouter = Router()

// Rotas dos produtos
// Listar todos os produtos
productRouter.use(authorizationValidation)
productRouter.get("/produtos", listProducts)

// Listar os mais vendidos / Por enquanto só retorna aleatóriamente
productRouter.get("/produtos/mais-vendidos", betterSellers)

// Cadastrar um produto
productRouter.post("/produtos", validateSchema(productSchema), registerProduct)

export default productRouter