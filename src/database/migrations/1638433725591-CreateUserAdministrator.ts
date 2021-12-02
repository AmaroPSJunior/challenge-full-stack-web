import {MigrationInterface, QueryRunner, getConnection} from "typeorm";
import { User } from "../../modules/users/entities/User";

export class CreateUserAdministrator1638433725591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.users(
                id, 
                name, 
                email, 
                phone, 
                cpf, 
                ra, 
                profile, 
                active, 
                created_at
            )
            VALUES(
                'b67705e4-9d01-4e6b-9fb1-ec5b758726eb', 
                'Administrador', 
                'admin@admin.com', 
                123456789, 
                32268300900, 
                123456789, 
                'Administrador', 
                true, 
                '2021-11-23 00:29:05.803'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM public.users
            WHERE id = 'b67705e4-9d01-4e6b-9fb1-ec5b758726eb';
        
        `)
    }

}
