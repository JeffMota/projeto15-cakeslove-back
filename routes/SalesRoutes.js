import { Router } from "express";
import { registrySale } from "../controller/Sell.js";
import { authorizationValidation } from "../middleware/AuthMiddleware.js";
import validateSchema from "../middleware/ValidateSchema.js";
import { sellSchema } from "../schema/SellSchema.js";

const salesRouter = Router()

salesRouter.use(authorizationValidation)
//Registrar venda
salesRouter.post('/sell', validateSchema(sellSchema), registrySale)

export default salesRouter