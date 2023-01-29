import express from 'express'
import cors from 'cors'
import authRouter from "../routes/AuthRoutes.js"
import productRouter from '../routes/ProductsRoutes.js';
import dotenv from 'dotenv'
import cartRouter from '../routes/CartRoutes.js';
import salesRouter from '../routes/SalesRoutes.js';
dotenv.config();

const server = express()
server.use(express.json())
server.use(cors())

server.use([authRouter, productRouter, cartRouter, salesRouter])
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running in port ${PORT}`))