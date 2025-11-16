import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import {rateLimiter} from "./api/v1/middleware/expressRateLimiter";
import cdRoutes from "./api/v1/routes/cdRoute";
import reviewRoutes from "./api/v1/routes/reviewRoute";
import borrowedRoutes from "./api/v1/routes/borrowedRoute";

const app: Express = express();

app.use(express.json());
app.use(rateLimiter);
setupSwagger(app);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("api/v1/cds", cdRoutes);
app.use("api/v1/reviews", reviewRoutes);
app.use("api/v1/borrowed", borrowedRoutes);

app.use(errorHandler);

export default app;