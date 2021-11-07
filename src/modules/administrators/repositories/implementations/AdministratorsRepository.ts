import { getRepository, Repository } from "typeorm";
import { Administrator } from "../../entities/Administrator";
import { IAdministratorsRepository, ICreateAdministratorDTO } from "../IAdministratorsRepositories";

class AdministratorsRepository implements IAdministratorsRepository{
  
  private repository: Repository<Administrator>;

  constructor() { this.repository = getRepository(Administrator); }

  async create({ name, email, cpf }: ICreateAdministratorDTO): Promise<void> {
    const administrator = this.repository.create({ name, email, cpf });
    await this.repository.save(administrator);
  }

  async list(): Promise<Administrator[]> {
    const administrators = await this.repository.find();
    return administrators;
  }

  async findById(id: string): Promise<Administrator> {
    const administrator = await this.repository.findOne({ id });
    return administrator;
  }
}

export { AdministratorsRepository }