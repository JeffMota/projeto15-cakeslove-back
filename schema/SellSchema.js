import joi from 'joi'

export const sellSchema = joi.object({
    products: joi.array().required(),
    date: joi.string().required(),
    price: joi.number().required(),
    payment: joi.string().required(),
    delivery: joi.boolean().required()
});