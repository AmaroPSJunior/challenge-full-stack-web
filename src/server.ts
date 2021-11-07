import 'reflect-metadata';
import "./database";
import "./shared/container/index";

import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server in running!  " + " * * * * * * * * " + new Date() + " * * * * * * * * " ));    