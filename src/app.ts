import express, { Express } from "express";
import setupSwagger from "../config/swagger";

const app: Express = express();

app.use(express.json());
setupSwagger(app);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;