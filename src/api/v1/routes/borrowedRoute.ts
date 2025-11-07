import express, {Router} from "express";
import {
    getAllBorrowed,
    createBorrowedRecord,
    updateBorrowedRecord,
    deleteBorrowedRecord
} from "../controllers/borrowedController";

const router: Router = express.Router();

/**
 * @openapi
 * /borrowed:
 *   get:
 *     summary: Retrieve all borrowed CDs
 *     tags: [Borrowed]
 *     responses:
 *       '200':
 *         description: Borrowed CDs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 cdId:
 *                   type: number
 *                 status:
 *                   type: string
 *                 dateBorrowed:
 *                   type: string
 *                   format: date-time
 *                 dateReturned:
 *                   type: string
 *                   format: date-time
 */
router.get("/borrowed", getAllBorrowed);

/**
 * @openapi
 * /borrowed:
 *   post:
 *     summary: Create a record
 *     tags: [Borrowed]
 *     requestBody:
 *       required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              required:
*                - cdId
*                - status
*                - dateBorrowed
*              properties:
*                id:
*                  type: number
*                cdId:
*                  type: number
*                status:
*                  type: string
*                dateBorrowed:
*                  type: string
*                  format: date-time
*                dateReturned:
*                  type: string
*                  format: date-time
*/
router.post("/borrowed", createBorrowedRecord);

/**
 * @openapi
 * /borrowed/{id}:
 *   put:
 *     summary: Update a record
 *     tags: [Borrowed]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *               dateBorrowed:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Record updated successfully
 *       '404':
 *         description: Record not found
 */
router.put("/borrowed/:id", updateBorrowedRecord);

/**
 * @openapi
 * /borrowed/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Borrowed]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific record to delete
 *     responses:
 *       '200':
 *         description: Record deleted successfully
 *       '404':
 *         description: Record not found
 */
router.delete("/borrowed/:id", deleteBorrowedRecord);

export default router;