import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Borrowed:
 *       type: object
 *       required:
 *         - cdId
 *         - status
 *         - dateBorrowed
 *       properties:
 *         cdId:
 *           type: integer
 *           example: 123
 *         status:
 *           type: string
 *           enum:
 *             - borrowed
 *             - available
 *           example: "available"
 *         dateBorrowed:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T00:00:00.000Z"
 *         dateReturned:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T00:00:00.000Z"
 */
export const createBorrowedSchema = Joi.object({
    cdId: Joi.number().required(),
    status: Joi.string().valid("borrowed", "available").required(),
    dateBorrowed: Joi.date().required(),
    dateReturned: Joi.date() //only needed when it has already been borrowed and returned
});