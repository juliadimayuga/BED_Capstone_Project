import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import {rateLimiter} from "./api/v1/middleware/expressRateLimiter";
import adminRoute from "./api/v1/routes/adminRoute"
import userRoute from "./api/v1/routes/userRoute"
import equipmentRoutes from "./api/v1/routes/equipmentRoute";
import reviewRoutes from "./api/v1/routes/reviewRoute";
import scheduleRoutes from "./api/v1/routes/scheduleRecordRoute";

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
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

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1", equipmentRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1", scheduleRoutes);

app.use(errorHandler);

export default app;