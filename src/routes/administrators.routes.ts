import { Router } from 'express';
import { administratorByIdController } from '../modules/administrators/useCases/administratorById';
import { createAdministratorController } from '../modules/administrators/useCases/createAdministrator';
import { listAdministratorController } from '../modules/administrators/useCases/listAdministrator';

const administratorsRoutes = Router();

administratorsRoutes.post("/", (request, response) => {
  createAdministratorController.handle(request, response);
});

administratorsRoutes.get("/", (request, response) => {
  listAdministratorController.handle(request, response);
});

administratorsRoutes.get("/:id", (request, response) => {
  return administratorByIdController.handle(request, response);
});

export { administratorsRoutes }