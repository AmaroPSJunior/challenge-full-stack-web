import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("users")
class User {
  
  @PrimaryColumn()
  id?: string; 

  @Column()
  name: string;

  @Column()
  email: string; 

  @Column()
  phone: number;

  @Column()
  cpf: number;
  
  @Column()
  ra?: number;

  @Column()
  profile: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };