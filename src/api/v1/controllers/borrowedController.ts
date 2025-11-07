import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createBorrowedSchema } from "../validators/borrowedValidator";
import * as borrowedService from "../services/borrowedService";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Retrieves all borrowed CDs
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllBorrowed = async (req: Request, res: Response
): Promise<void> => {
    try{
        const borrowed = await borrowedService.getAllBorrowed();
        res.status(HTTP_STATUS.OK).json(successResponse(
            borrowed, 
            "Retrieved all borrowed CDs successfully."
        ));
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null, 
            "Failed to retrieve borrowed CDs."
        ));
    }
};

/**
 * Creates a record
 * @param req - Express request object
 * @param res - Express response object
 */
export const createBorrowedRecord = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {error, value} = createBorrowedSchema.validate(req.body);
        const borrowed = await borrowedService.createBorrowedRecord(value);
        if (borrowed){
            res.status(HTTP_STATUS.CREATED).json(successResponse(
                borrowed,
                "Record created successfully."
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
            "Failed to create record."
        ));
    }
};

/**
 * Updates the record specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateBorrowedRecord = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const {status, dateBorrowed, dateReturned} = req.body;
        if (status !== "borrowed" && status !== "available"){
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(
                null, 
                "Must be 'borrowed' or 'available'."
            ));
            return;
        }
        const updatedRecord = 
            await borrowedService.updateBorrowedRecord(Number(id), {
                status,
                dateBorrowed,
                dateReturned
            });
        if (updatedRecord){
            res.status(HTTP_STATUS.OK).json(successResponse(
                updatedRecord,
                "Record updated successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "Record not found."
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to update record."
        ));
    }
};

/**
 * Deletes the record specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteBorrowedRecord = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedRecord = await borrowedService.deleteBorrowedRecord(Number(id));
        if (deletedRecord){
            res.status(HTTP_STATUS.OK).json(successResponse(
                null,
                "Record deleted successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "Record not found"
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to delete Record."
        ));
    }
};