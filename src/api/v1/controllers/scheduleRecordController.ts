import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createScheduleRecordSchema } from "../validators/scheduleRecordValidator";
import * as scheduleService from "../services/scheduleRecordService";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Retrieves all schedule records
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllSchedules = async (req: Request, res: Response
): Promise<void> => {
    try{
        const borrowed = await scheduleService.getAllSchedules();
        res.status(HTTP_STATUS.OK).json(successResponse(
            borrowed, 
            "Retrieved all borrowed equipment successfully."
        ));
    }
    catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse(
            null, 
            "Failed to retrieve borrowed equipment."
        ));
    }
};

/**
 * Creates a record
 * @param req - Express request object
 * @param res - Express response object
 */
export const createScheduleRecord = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {error, value} = createScheduleRecordSchema.validate(req.body);
        const borrowed = await scheduleService.createScheduleRecord(value);
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
export const updateScheduleRecord = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const {equipmentId, startDate} = req.body;

        const updatedRecord = await scheduleService.updateScheduleRecord(Number(id), 
        {
            equipmentId,
            startDate
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
export const deleteScheduleRecord = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedRecord = await scheduleService.deleteScheduleRecord(Number(id));
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
            "Failed to delete record."
        ));
    }
};