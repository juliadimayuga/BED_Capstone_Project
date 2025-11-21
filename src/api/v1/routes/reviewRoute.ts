import express, {Router} from "express";
import {
    getAllReviews,
    createReview,
    deleteReview
} from "../controllers/reviewController";
import { validateCreateReview } from "../middleware/validatorMiddleware";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     tags: [Reviews]
 *     responses:
 *       '200':
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id:
 *                   type: number
 *                 cdId:
 *                   type: number
 *                 comment:
 *                   type: string
 *                 rating:
 *                   type: number
 */
router.get("/reviews", authenticate, getAllReviews);

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cdId
 *               - comment
 *               - rating
 *             properties:
 *               id:
 *                 type: number
 *               cdId:
 *                 type: number
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 */
router.post("/reviews", authenticate, validateCreateReview, createReview);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the specific review to delete
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *       '404':
 *         description: Review not found
 */
router.delete("/reviews/:id", 
    authenticate, 
    isAuthorized({hasRole: ["admin"]}), 
    deleteReview
);

export default router;