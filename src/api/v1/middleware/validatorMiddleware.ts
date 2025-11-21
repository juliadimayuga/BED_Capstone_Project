import { Request, Response, NextFunction } from "express";
import { createEquipmentSchema } from "../validators/equipmentValidator";
import { createReviewSchema } from "../validators/reviewValidator";
import { createScheduleRecordSchema } from "../validators/scheduleRecordValidator";

export const validateCreateEquipment = (req: Request, res: Response, next: NextFunction) => {
    const {error} = createEquipmentSchema.validate(req.body, { abortEarly: false });

    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }
    next();
};

export const validateCreateReview = (req: Request, res: Response, next: NextFunction) => {
    const {error} = createReviewSchema.validate(req.body, { abortEarly: false });

    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }
    next();
};

export const validateCreateScheduleRecord = (req: Request, res: Response, next: NextFunction) => {
    const {error} = createScheduleRecordSchema.validate(req.body, { abortEarly: false });

    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }
    next();
};