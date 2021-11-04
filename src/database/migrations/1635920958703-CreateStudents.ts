import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStudents1635920958703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "student",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar"
                        },
                        {
                            name: "email",
                            type: "varchar"
                        },
                        {
                            name: "ra",
                            type: "int"
                        },
                        {
                            name: "cpf",
                            type: "varchar"
                        },
                        {
                            name: "create_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }

}
