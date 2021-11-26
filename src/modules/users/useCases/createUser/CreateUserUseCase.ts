import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepositories";

interface IRequest {
  id?: string;
  name: string;
  email: string;
  phone: number;
  cpf: number;
  ra: number;
  profile: string;
  active: boolean;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user: IRequest): Promise<void> {
    const mandatoryParamsSetting = [
      { param: 'name',     maxLength: 29 },
      { param: 'email',    maxLength: 29 },
      { param: 'phone',    maxLength: 19 },
      { param: 'cpf',      maxLength: 19 },
      { param: 'ra',       maxLength: 19 },
      { param: 'profile',  maxLength: 19 },
      { param: 'active'                  }
    ];

    const checkNull = (user: IRequest): string => {
      const paramNull = mandatoryParamsSetting.find(mp => !user[mp.param]);
      return paramNull ? `${paramNull.param} cannot be empty` : null;
    }

    const ckeckMaxLength = (user: IRequest): string => {
      const paramMax = mandatoryParamsSetting.find(mp => `${user[mp.param]}`.length > mp.maxLength);
      return paramMax ? `${paramMax.param} must have a maximum of ${paramMax.maxLength} characters` : null;
    }

    const validateEmail = (email: string): string => {
      const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(String(email).toLowerCase()) ? null : 'Invalid Email';
    }

    const checkCpf = (cpf: any): string => {      
      const validate = (cpf: any) => checkAll(prepare(`${cpf}`));
      const notDig = (i: any) => !['.', '-', ' '].includes(i);
      const prepare = (cpf: any) => cpf.trim().split('').filter(notDig).map(Number);
      const is11Len = (cpf: any) => cpf.length === 11;
      const notAllEquals = (cpf: any) => !cpf.every(i => cpf[0] === i);
      const onlyNum = (cpf: any) => cpf.every(i => !isNaN(i));
      const calcDig = (limit: any) => (a, i, idx) => a + i * ((limit + 1) - idx);
      const somaDig = (cpf: any, limit: any) => cpf.slice(0, limit).reduce(calcDig(limit), 0);
      const resto11 = (somaDig: any) => 11 - (somaDig % 11);
      const zero1011 = (resto11: any) => [10, 11].includes(resto11) ? 0 : resto11;
      const getDV = (cpf: any, limit: any) => zero1011(resto11(somaDig(cpf, limit)));
      const verDig = (pos: any) => cpf => getDV(cpf, pos) === cpf[pos];
      const checks = [is11Len, notAllEquals, onlyNum, verDig(9), verDig(10)];
      const checkAll = (cpf: any) => checks.map(f => f(cpf)).every(r => !!r);
      return validate(cpf) ? null : 'Invalid CPF';
    }
    
    const errorParamNull = checkNull(user);
    if (errorParamNull) throw new AppError(errorParamNull);
    
    const errorMaxCharacter = ckeckMaxLength(user);
    if (errorMaxCharacter) throw new AppError(errorMaxCharacter);
    
    const errorValidateEmail = validateEmail(user.email);
    if (errorValidateEmail) throw new AppError(errorValidateEmail);
    
    const errorValidateCpf = checkCpf(user.cpf);
    if (errorValidateCpf) throw new AppError(errorValidateCpf);

    const userRegistred = await this.usersRepository.findByUser(user);
    if(userRegistred) throw new AppError('User already exists');
    await this.usersRepository.create(user);
  }
}

export { CreateUserUseCase }