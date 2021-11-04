import { Router } from "express";
import { administratorsRoutes } from "./administrators.routes";
import { studentsRoutes } from "./students.routes";

const router = Router();
router.use("/students", studentsRoutes);
router.use("/administrators", administratorsRoutes);

export { router }