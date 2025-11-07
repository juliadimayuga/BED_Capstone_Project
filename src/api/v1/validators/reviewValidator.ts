import Joi from "joi";

export const createReviewSchema = Joi.object({
    cdId: Joi.number().required(),
    comment: Joi.string().min(2).max(100).required(),
    rating: Joi.number().min(1).max(5).required()
});