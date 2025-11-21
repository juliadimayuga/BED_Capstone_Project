import express, {Router} from "express";
import {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
} from "../controllers/equipmentController";
import { validateCreateEquipment } from "../middleware/validatorMiddleware";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /equipment:
 *   get:
 *     summary: Retrieve all equipment
 *     tags: [Equipment]
 *     responses:
 *       '200':
 *         description: Equipment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 brand:
 *                   type: string
 *                 type:
 *                   type: string
 *                 hasBeenScheduled:
 *                   type: boolean
 */
router.get("/equipment", authenticate, getAllEquipment);

/**
 * @openapi
 * /equipment/{id}:
 *   get:
 *     summary: Retrieve an equipment item by its ID
 *     tags: [Equipment]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The specific equipment's ID
 *     responses:
 *       '200':
 *         description: Equipment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 brand:
 *                   type: string
 *                 type:
 *                   type: string
 *                 hasBeenScheduled:
 *                   type: boolean
 *       '404':
 *         description: Equipment not found
 */
router.get("/equipment/:id", authenticate, getEquipmentById);

/**
 * @openapi
 * /equipment:
 *   post:
 *     summary: Create an equipment item
 *     tags: [Equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *               - type
 *               - hasBeenScheduled
 *             properties:
 *               name:
 *                 type: string
 *               brand:
 *                 type: string
 *               type:
 *                 type: string
 *               hasBeenScheduled:
 *                 type: boolean
 */
router.post("/equipment", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}), 
    validateCreateEquipment, 
    createEquipment
);

/**
 * @openapi
 * /equipment/{id}:
 *   put:
 *     summary: Update an equipment item
 *     tags: [Equipment]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific equipment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hasBeenScheduled
 *             properties:
 *               hasBeenScheduled:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Equipment updated successfully
 *       '404':
 *         description: Equipment not found
 */
router.put("/equipment/:id", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}), 
    updateEquipment);

/**
 * @openapi
 * /equipment/{id}:
 *   delete:
 *     summary: Delete an equipment item
 *     tags: [Equipment]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific equipment to delete
 *     responses:
 *       '200':
 *         description: Equipment deleted successfully
 *       '404':
 *         description: Equipment not found
 */
router.delete("/equipment/:id", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}), 
    deleteEquipment);

export default router;