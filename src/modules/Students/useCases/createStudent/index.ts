import { StudentsRepository } from "../../repositories/implementations/StudentsRepository";
import { CreateStudentUseCase } from "./CreateStudentUseCase";
import { CreateStudentController } from "./CreateStudentController";

const studentsRepository = StudentsRepository.getInstance();
const createStudentUseCase = new CreateStudentUseCase(studentsRepository);
const createStudentController = new CreateStudentController(createStudentUseCase);

export { createStudentController };