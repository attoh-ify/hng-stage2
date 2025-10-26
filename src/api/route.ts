import { Application, Request, Response } from "express";
import {
  deleteCountryByName,
  getCountries,
  getCountryByName,
  getCountryStatus,
  getCountrySummaryImage,
  refresh
} from "./controller";

export const setupRoutes = (app: Application): void => {
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  app.post("/countries/refresh", refresh);

  app.get("/countries/image", getCountrySummaryImage);

  app.get("/countries", getCountries);

  app.get("/countries/:name", getCountryByName);

  app.delete("/countries/:name", deleteCountryByName);

  app.get("/status", getCountryStatus);
};
