import { Router } from 'express';
import { AdministratorByIdController } from '../modules/administrators/useCases/administratorById/AdministratorByIdController';
import { CreateAdministratorController } from '../modules/administrators/useCases/createAdministrator/CreateAdministratorController';
import { ListAdministratorController } from '../modules/administrators/useCases/listAdministrator/ListAdministratorController';

const administratorsRoutes = Router();
const createAdministratorController = new CreateAdministratorController();
const listAdministratorController = new ListAdministratorController();
const administratorByIdController = new AdministratorByIdController();

administratorsRoutes.post("/", createAdministratorController.handle);
administratorsRoutes.get("/", listAdministratorController.handle);
administratorsRoutes.get("/:id", administratorByIdController.handle);

export { administratorsRoutes }