import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { setupRoutes } from "./api/route";
import limiter from "./middleware/rate-limiter";
// import { initDb } from "./api/db";
import { logger } from "./middleware/logger";
import { sequelize } from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const app = express();

        app.use(cors());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(limiter);

        await sequelize.authenticate();
        console.log("Database connected successfully.")
        
        await sequelize.sync({ alter: true });
        
        setupRoutes(app);

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}...`);
        });
    } catch {
        process.exit(1);
    };
};

startServer();
