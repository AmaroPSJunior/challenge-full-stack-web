import { v4 as uuidv4 } from 'uuid';

class Student {
  id?: string;
  name: string; 
  email: string; 
  ra: number;
  cpf: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Student };