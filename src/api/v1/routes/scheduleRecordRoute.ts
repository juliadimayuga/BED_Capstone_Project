import express, {Router} from "express";
import {
    getAllSchedules,
    createScheduleRecord,
    updateScheduleRecord,
    deleteScheduleRecord
} from "../controllers/scheduleRecordController";
import { validateCreateScheduleRecord } from "../middleware/validatorMiddleware";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /schedules:
 *   get:
 *     summary: Retrieve all scheduled equipment
 *     tags: [Schedules]
 *     responses:
 *       '200':
 *         description: Scheduled equipment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 equipmentId:
 *                   type: number
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 */
router.get("/schedules", authenticate, getAllSchedules);

/**
 * @openapi
 * /schedules:
 *   post:
 *     summary: Create a schedule record
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - equipmentId
 *               - startDate
 *               - endDate
 *             properties:
 *               id:
 *                 type: number
 *               equipmentId:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 */
router.post("/schedules", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}),
    validateCreateScheduleRecord, 
    createScheduleRecord
);

/**
 * @openapi
 * /schedules/{id}:
 *   put:
 *     summary: Update a schedule record
 *     tags: [Schedules]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific schedule record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Schedule record updated successfully
 *       '404':
 *         description: Schedule record not found
 */
router.put("/schedules/:id", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}),
    updateScheduleRecord
);

/**
 * @openapi
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule record
 *     tags: [Schedules]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific schedule record to delete
 *     responses:
 *       '200':
 *         description: Schedule record deleted successfully
 *       '404':
 *         description: Schedule record not found
 */
router.delete("/schedules/:id", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}),
    deleteScheduleRecord
);

export default router;