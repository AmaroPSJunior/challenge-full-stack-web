import { Router } from 'express';
import { createStudentController } from '../modules/Students/useCases/createStudent';
import { listStudentController } from '../modules/Students/useCases/listStudent';
import { studentByIdController } from '../modules/Students/useCases/studentById';

const studentsRoutes = Router();

studentsRoutes.post("/", (request, response) => createStudentController.handle(request, response));
studentsRoutes.get("/", (request, response) => listStudentController.handle(request, response));
studentsRoutes.get("/:id", (request, response) => {
  const { id } = request.params;
  studentByIdController.handle(request, response, id)
});

export { studentsRoutes }