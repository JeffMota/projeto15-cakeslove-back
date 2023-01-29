import db from "../config/database.js";

export async function registrySale(req, res) {
    const body = req.body
    try {
        await db.collection('sales').insertOne(body)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}