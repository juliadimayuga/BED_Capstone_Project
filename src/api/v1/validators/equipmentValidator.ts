import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - type
 *         - hasBeenScheduled
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 40
 *           example: "Treadmill"
 *         brand:
 *           type: string
 *           minLength: 1
 *           maxLength: 30
 *           example: "RunningGroup"
 *         type:
 *           type: string
 *           minLength: 2
 *           maxLength: 30
 *           example: "Cardio"
 *         hasBeenScheduled:
 *           type: boolean
 *           example: false
 */
export const createEquipmentSchema = Joi.object({
    name: Joi.string().min(1).max(40).required(),
    brand: Joi.string().min(1).max(30).required(),
    type: Joi.string().min(2).max(30).required(),
    hasBeenScheduled: Joi.boolean().required()
});