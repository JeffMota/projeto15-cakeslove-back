import db from "../config/database.js";

//Listar todos os produtos
export async function listProducts(req, res) {

    try {

        const list = await db.collection('products').find().toArray()

        res.send(list)

    } catch (error) {
        res.status(500).send(error.message)
    }

}
//Listar os mais vendidos / Por enquanto só retorna aleatóriamente
export async function betterSellers(req, res) {

    try {

        const bs = await db.collection('products').find().limit(10).toArray()
        let aux = []
        while (aux.length < bs.length) {
            let n = Math.floor(Math.random() * bs.length)
            if (!aux.includes(bs[n])) {
                aux.push(bs[n])
            }
        }

        res.send(aux)

    } catch (error) {
        res.status(500).send(error.message)
    }

}