import { Administrator } from "../../model/Administrator";
import { IAdministratorsRepository, ICreateAdministratorDTO } from "../IAdministratorsRepositories";

class AdministratorsRepository implements IAdministratorsRepository{
  
  private administrators: Administrator[];

  private static INSTANCE: AdministratorsRepository;

  private constructor() { this.administrators = []; }

  public static getInstance(): AdministratorsRepository {
    if (!AdministratorsRepository.INSTANCE) {
      AdministratorsRepository.INSTANCE = new AdministratorsRepository();
    }
    return AdministratorsRepository.INSTANCE;
  };

  create({ name, email, cpf }: ICreateAdministratorDTO): Administrator {
    const administrator = new Administrator();
  
    Object.assign(administrator, {
      name,
      email,
      cpf
    });

    this.administrators.push(administrator);

    return administrator;
  }

  list(): Administrator[] {
    return this.administrators;
  }

  findById(idAdmin: string): Administrator {
    return this.administrators.find(a => a.id === idAdmin);
  }
}

export { AdministratorsRepository }