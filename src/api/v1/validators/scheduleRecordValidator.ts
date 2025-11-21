import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     ScheduleRecord:
 *       type: object
 *       required:
 *         - equipmentId
 *         - startDate
 *       properties:
 *         equipmentId:
 *           type: integer
 *           example: 123
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-01-08T00:00:00.000Z"
 */
export const createScheduleRecordSchema = Joi.object({
    equipmentId: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date() //automatically added, 7 days from the start date
});