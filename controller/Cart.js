import db from "../config/database.js";



export async function getUserCart(req, res) {

    const user = res.locals.user

    try {

        

        const list = await db.collection('carts').find({ user: user._id}).toArray()


        res.send({ list, user })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function addProductCart(req, res) {

    const { name, description, price, quantity, imgURL } = req.body
    const user = res.locals.user

    try {
        let cart = await db.collection('carts').findOne({ user: user._id })
        if (!cart) {
            cart = await db.collection('carts').insertOne({ user: user._id, products: [{ name, description, price, quantity, imgURL }] })
            res.status(201).send("created Cart and added product")
        } else if (cart.products.filter(p => p.name === name).length>0) {
            await db.collection('carts').updateOne({ user: user._id, "products.name": name }, { $inc: { "products.$.quantity": quantity } })
            res.status(202).send("added product quantity")
        } else {
            cart = await db.collection('carts').updateOne(cart, {$set: {products:[...cart.products, {name, description, price, quantity, imgURL}]}})
         res.status(202).send("added product")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function delProductCart(req, res) {

    const { name, description, price, quantity, imgURL } = req.body
    const user = res.locals.user
   
    try {
        let cart = await db.collection('carts').findOne({ user: user._id })
        let quantProduct = Number(cart.products.filter(p => p.name === name)[0].quantity)
 
        if (quantProduct > 0) {
            await db.collection('carts').updateOne({ user: user._id, "products.name": name }, { $inc: { "products.$.quantity": -1 } })
            res.status(202).send("decresead cart's product's quantity")
        } else{
            res.status(403).send("quantity = 0")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}