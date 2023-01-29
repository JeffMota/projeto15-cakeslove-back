import joi from 'joi'

export const productSchema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    imgURL: joi.string().uri().required()
});