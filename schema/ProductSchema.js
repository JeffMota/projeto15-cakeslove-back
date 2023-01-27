import joi from 'joi'

export const productSchema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().required(),
    price: joi.string().required(),
    quantity: joi.string().required(),
    imgURL: joi.string().uri().required()
});