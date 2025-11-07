import Joi from "joi";

export const createCdSchema = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    artist: Joi.string().min(1).max(40).required(),
    genre: Joi.string().min(2).max(20).required(),
    borrowed: Joi.boolean().required()
});