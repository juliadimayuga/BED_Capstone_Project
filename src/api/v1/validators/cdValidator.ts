import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Cd:
 *       type: object
 *       required:
 *         - title
 *         - artist
 *         - genre
 *         - borrowed
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 30
 *           example: "First Song"
 *         artist:
 *           type: string
 *           minLength: 1
 *           maxLength: 40
 *           example: "First Singer"
 *         genre:
 *           type: string
 *           example: "Classical"
 *         borrowed:
 *           type: boolean
 *           example: false
 */
export const createCdSchema = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    artist: Joi.string().min(1).max(40).required(),
    genre: Joi.string().min(2).max(20).required(),
    borrowed: Joi.boolean().required()
});