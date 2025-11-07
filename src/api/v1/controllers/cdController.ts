import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createCdSchema } from "../validators/cdValidator";
import * as cdService from "../services/cdService";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Retrieves all CDs
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllCds = async (req: Request, res: Response
): Promise<void> => {
    try{
        const cds = await cdService.getAllCds();
        res.status(HTTP_STATUS.OK).json(successResponse(
            cds, 
            "Retrieved all CDs successfully."
        ));
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null, 
            "Failed to retrieve CDs."
        ));
    }
};

/**
 * Retrieves a CD by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getCdById = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const cd = await cdService.getCdById(Number(id));
        if (cd){
            res.status(HTTP_STATUS.OK).json(successResponse(
                cd,
                "CD retrieved successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null, 
                "CD not found."
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to retrieve CD."
        ));
    }
};

/**
 * Creates a CD
 * @param req - Express request object
 * @param res - Express response object
 */
export const createCd = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {error, value} = createCdSchema.validate(req.body);
        const cd = await cdService.createCd(value);
        if (cd){
            res.status(HTTP_STATUS.CREATED).json(successResponse(
                cd,
                "CD created successfully."
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
            "Failed to create CD."
        ));
    }
};

/**
 * Updates the CD specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateCd = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const {borrowed} = req.body;
        if (typeof borrowed !== "boolean"){
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(
                null, 
                "Must be true or false."
            ));
            return;
        }
        const updatedCd = 
            await cdService.updateCd(Number(id), {borrowed});
        if (updatedCd){
            res.status(HTTP_STATUS.OK).json(successResponse(
                updatedCd,
                "CD updated successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "CD not found."
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to update CD."
        ));
    }
};

/**
 * Deletes the CD specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteCd = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedCd = await cdService.deleteCd(Number(id));
        if (deletedCd){
            res.status(HTTP_STATUS.OK).json(successResponse(
                null,
                "CD deleted successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "CD not found"
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to delete CD."
        ));
    }
};