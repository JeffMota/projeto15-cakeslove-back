import db from "../config/database.js";

export async function listProducts(req, res) {

    try {

        const list = await db.collection('products').find().toArray()

        return res.send(list)

    } catch (error) {
        res.send(error)
    }

}