import Joi from "joi";

export const createReviewSchema = Joi.object({
    cdId: Joi.number().required(),
    status: Joi.string().valid("borrowed", "available").required(),
    dateBorrowed: Joi.date().required(),
    dateReturned: Joi.date() //only needed when it has already been borrowed and returned
});