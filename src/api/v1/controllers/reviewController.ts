import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createReviewSchema } from "../validators/reviewValidator";
import * as reviewService from "../services/reviewService";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Retrieves all reviews
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllReviews = async (req: Request, res: Response
): Promise<void> => {
    try{
        const fieldValuePairs: {fieldName: string; fieldValue: any}[] = [];
        for (const field in req.query){
            let value: any = req.query[field];
            if(field === "rating"){
                value = Number(value);
            }
            fieldValuePairs.push({fieldName: field, fieldValue: value});
        }
        const reviews = await reviewService.getAllReviews(fieldValuePairs);
        res.status(HTTP_STATUS.OK).json(successResponse(
            reviews, 
            "Retrieved all reviews successfully."
        ));
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null, 
            "Failed to retrieve reviews."
        ));
    }
};

/**
 * Creates a review
 * @param req - Express request object
 * @param res - Express response object
 */
export const createReview = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {error, value} = createReviewSchema.validate(req.body);
        const review = await reviewService.createReview(value);
        if (review){
            res.status(HTTP_STATUS.CREATED).json(successResponse(
                review,
                "Review created successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(
                null, 
                error?.message
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to create review."
        ));
    }
};

/**
 * Deletes the review specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteReview = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedReview = await reviewService.deleteReview(Number(id));
        if (deletedReview){
            res.status(HTTP_STATUS.OK).json(successResponse(
                null,
                "Review deleted successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "Review not found"
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to delete review."
        ));
    }
};