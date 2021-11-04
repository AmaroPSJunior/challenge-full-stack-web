import { StudentsRepository } from "../../repositories/implementations/StudentsRepository";
import { StudentByIdController } from "./StudentByIdController";
import { StudentByIdUseCase } from "./StudentByIdUseCase";

const studentsRepository = StudentsRepository.getInstance();
const studentByIdUseCase = new StudentByIdUseCase(studentsRepository);
const studentByIdController = new StudentByIdController(studentByIdUseCase);

export { studentByIdController }