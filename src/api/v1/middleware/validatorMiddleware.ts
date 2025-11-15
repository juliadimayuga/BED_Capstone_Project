import { Request, Response, NextFunction } from "express";
import { createCdSchema } from "../validators/cdValidator";
import { createReviewSchema } from "../validators/reviewValidator";
import { createBorrowedSchema } from "../validators/borrowedValidator";

export const validateCreateCd = (req: Request, res: Response, next: NextFunction) => {
    const {error} = createCdSchema.validate(req.body, { abortEarly: false });

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

export const validateCreateBorrowed = (req: Request, res: Response, next: NextFunction) => {
    const {error} = createBorrowedSchema.validate(req.body, { abortEarly: false });

    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }
    next();
};