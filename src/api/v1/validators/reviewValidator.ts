import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - cdId
 *         - comment
 *         - rating
 *       properties:
 *         cdId:
 *           type: integer
 *           example: 123
 *         comment:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "I love this song!"
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 */
export const createReviewSchema = Joi.object({
    cdId: Joi.number().required(),
    comment: Joi.string().min(2).max(100).required(),
    rating: Joi.number().min(1).max(5).required()
});