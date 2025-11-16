import rateLimit from "express-rate-limit";
import {Request, Response} from "express";
import { errorResponse } from "../models/responseModel";

/**
 * The express rate limiter prevents too many 
 * requests from being sent at one time.
 */
export const rateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
        return res.status(429).json(
            errorResponse("Too many requests have been sent in two minutes. Wait and try again later.")
        );
    }
});