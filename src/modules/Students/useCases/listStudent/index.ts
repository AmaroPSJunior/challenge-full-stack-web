import { StudentsRepository } from "../../repositories/implementations/StudentsRepository";
import { ListStudentController } from "./ListStudentController";
import { ListStudentUseCase } from "./ListStudentUseCase";

const studentsRepository = StudentsRepository.getInstance();
const listStudentUseCase = new ListStudentUseCase(studentsRepository);
const listStudentController = new ListStudentController(listStudentUseCase);

export { listStudentController }