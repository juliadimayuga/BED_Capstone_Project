import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createEquipmentSchema } from "../validators/equipmentValidator";
import * as equipmentService from "../services/equipmentService";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Retrieves all Equipment
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllEquipment = async (req: Request, res: Response
): Promise<void> => {
    try{
        const equipment = await equipmentService.getAllEquipment();
        res.status(HTTP_STATUS.OK).json(successResponse(
            equipment, 
            "Retrieved all equipment successfully."
        ));
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null, 
            "Failed to retrieve equipment."
        ));
    }
};

/**
 * Retrieves Equipment by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getEquipmentById = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const equipment = await equipmentService.getEquipmentById(Number(id));
        if (equipment){
            res.status(HTTP_STATUS.OK).json(successResponse(
                equipment,
                "Equipment retrieved successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null, 
                "Equipment not found."
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to retrieve equipment."
        ));
    }
};

/**
 * Creates Equipment
 * @param req - Express request object
 * @param res - Express response object
 */
export const createEquipment = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {error, value} = createEquipmentSchema.validate(req.body);
        const equipment = await equipmentService.createEquipment(value);
        if (equipment){
            res.status(HTTP_STATUS.CREATED).json(successResponse(
                equipment,
                "Equipment created successfully."
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
            "Failed to create equipment."
        ));
    }
};

/**
 * Updates the Equipment specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateEquipment = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const {hasBeenScheduled} = req.body;
        if (typeof hasBeenScheduled !== "boolean"){
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(
                null, 
                "Must be true or false."
            ));
            return;
        }
        const updatedEquipment = 
            await equipmentService.updateEquipment(Number(id), {hasBeenScheduled});
        if (updatedEquipment){
            res.status(HTTP_STATUS.OK).json(successResponse(
                updatedEquipment,
                "Equipment updated successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "Equipment not found."
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to update equipment."
        ));
    }
};

/**
 * Deletes the Equipment specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteEquipment = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedEquipment = await equipmentService.deleteEquipment(Number(id));
        if (deletedEquipment){
            res.status(HTTP_STATUS.OK).json(successResponse(
                null,
                "Equipment deleted successfully."
            ));
        }
        else{
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(
                null,
                "Equipment not found"
            ));
        }
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null,
            "Failed to delete equipment."
        ));
    }
};