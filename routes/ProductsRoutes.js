import { Router } from 'express'
import { listProducts } from '../controller/Product.js'
import { validateSchema } from '../middleware/ValidateSchema.js'

const productRouter = Router()

// Rotas dos produtos
// Listar todos os produtos
productRouter.get("/produtos", listProducts)

// Listar os produtos mais vendidos
productRouter.get("/produtos/mais-vendidos")

export default productRouter