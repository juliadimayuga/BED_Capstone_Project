import express, {Router} from "express";
import {
    getAllCds,
    getCdById,
    createCd,
    updateCd,
    deleteCd
} from "../controllers/cdController";
import { validateCreateCd } from "../middleware/validatorMiddleware";

const router: Router = express.Router();

/**
 * @openapi
 * /cds:
 *   get:
 *     summary: Retrieve all CDs
 *     tags: [CDs]
 *     responses:
 *       '200':
 *         description: CDs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 artist:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 borrowed:
 *                   type: boolean
 */
router.get("/cds", getAllCds);

/**
 * @openapi
 * /cds/{id}:
 *   get:
 *     summary: Retrieve a CD by it's ID
 *     tags: [CDs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The specific CD's ID
 *     responses:
 *       '200':
 *         description: CD retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 artist:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 borrowed:
 *                   type: boolean
 *       '404':
 *         description: CD not found
 */
router.get("/cds/:id", getCdById);

/**
 * @openapi
 * /cds:
 *   post:
 *     summary: Create a CD
 *     tags: [CDs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *               - genre
 *               - borrowed
 *             properties:
 *               id:
 *                 type: number
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               genre:
 *                 type: string
 *               borrowed:
 *                 type: boolean
 */
router.post("/cds", validateCreateCd, createCd);

/**
 * @openapi
 * /cds/{id}:
 *   put:
 *     summary: Update a CD
 *     tags: [CDs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific CD to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - borrowed
 *             properties:
 *               borrowed:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: CD updated successfully
 *       '404':
 *         description: CD not found
 */
router.put("/cds/:id", updateCd);

/**
 * @openapi
 * /cds/{id}:
 *   delete:
 *     summary: Delete a CD
 *     tags: [CDs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific CD to delete
 *     responses:
 *       '200':
 *         description: CD deleted successfully
 *       '404':
 *         description: CD not found
 */
router.delete("/cds/:id", deleteCd);

export default router;