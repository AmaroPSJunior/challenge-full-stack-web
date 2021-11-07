import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("students")
class Student {
  
  @PrimaryColumn()
  id?: string; 

  @Column()
  name: string;

  @Column()
  email: string; 

  @Column()
  ra: number;

  @Column()
  cpf: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Student };