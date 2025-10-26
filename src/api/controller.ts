import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import dotenv from "dotenv";
import { CountryService } from "./services";
import Country from "./model";
import { FindOptions, Op, OrderItem } from "sequelize";
import AppStatus from "./app-status.model";
import { IMAGE_PATH } from "../utils/imageService";
dotenv.config();


export const refresh = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { total, time } = await CountryService.refreshCountries();
        res.status(200).json({
            message: "Cache refreshed successfully",
            total_countries: total,
            last_refreshed_at: time,
        });
    } catch (error) {
        next(error); // Pass to the global error handler
    }
};

export const getCountries = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { region, currency, sort } = req.query;

        const options: FindOptions = {
            where: {},
            // order: [] as OrderItem[], // <-- REMOVED
        };

        // --- FIX: Create the order array separately ---
        const orderItems: OrderItem[] = [];

        // Apply filters
        if (region) {
            (options.where as any).region = { [Op.like]: region };
        }
        if (currency) {
            (options.where as any).currency_code = { [Op.like]: currency };
        }

        // Apply sorting to the new array
        if (sort === "gdp_desc") {
            orderItems.push(["estimated_gdp", "DESC"]);
        } else {
            orderItems.push(["name", "ASC"]); // Default sort by name ASC
        }

        // --- FIX: Assign the completed array to options.order ---
        options.order = orderItems;

        const countries = await Country.findAll(options);
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

export const getCountryByName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.params;
        const country = await Country.findOne({
            where: { name: { [Op.like]: name } }, // Case-insensitive search
        });

        if (!country) {
            // As per spec
            return res.status(404).json({ error: "Country not found" });
        }
        res.status(200).json(country);
    } catch (error) {
        next(error);
    }
};

export const deleteCountryByName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name } = req.params;
        const result = await Country.destroy({
            where: { name: { [Op.like]: name } },
        });

        if (result === 0) {
            return res.status(404).json({ error: "Country not found" });
        }
        res.status(204).send(); // 204 No Content for successful DELETE
    } catch (error) {
        next(error);
    }
};

export const getCountryStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const status = await AppStatus.findByPk(1);
        if (!status) {
            // If /refresh has never been run
            return res.status(200).json({
                total_countries: 0,
                last_refreshed_at: null,
            });
        }
        res.status(200).json(status);
    } catch (error) {
        next(error);
    }
};

export const getCountrySummaryImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (fs.existsSync(IMAGE_PATH)) {
            // This will now work
            res.sendFile(IMAGE_PATH);
        } else {
            // As per spec
            res.status(404).json({ error: "Summary image not found" });
        }
    } catch (error) {
        next(error);
    }
};