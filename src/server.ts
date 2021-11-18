import 'reflect-metadata';
import "./database";
import "./shared/container/index";

import express, { NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";
import cors from "cors";
import { AppError } from './errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) return response.status(err.statusCode).json({ message: err.message});
  response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});

app.listen(3333, () => console.log("Server in running!"));    