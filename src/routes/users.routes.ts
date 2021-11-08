import { Router } from 'express';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/users/useCases/listUser/ListUserController';
import { UserByIdController } from '../modules/users/useCases/userById/UserByIdController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const userByIdController = new UserByIdController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUserController.handle);
usersRoutes.get("/:id", userByIdController.handle);

export { usersRoutes }