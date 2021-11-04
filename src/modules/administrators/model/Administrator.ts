import { v4 as uuidv4 } from 'uuid';

class Administrator {
  id?: string;
  name: string; 
  email: string; 
  cpf: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Administrator };