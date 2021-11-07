import { Router } from 'express';
import { CreateStudentController } from '../modules/students/useCases/createStudent/CreateStudentController';
import { ListStudentController } from '../modules/students/useCases/listStudent/ListStudentController';
import { StudentByIdController } from '../modules/students/useCases/studentById/StudentByIdController';

const studentsRoutes = Router();
const createStudentController = new CreateStudentController();
const listStudentController = new ListStudentController();
const studentByIdController = new StudentByIdController();

studentsRoutes.post("/", createStudentController.handle);
studentsRoutes.get("/", listStudentController.handle);
studentsRoutes.get("/:id", studentByIdController.handle);

export { studentsRoutes }