import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1635920958703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "users",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar(30)"
                        },
                        {
                            name: "email",
                            type: "varchar(30)"
                        },
                        {
                            name: "phone",
                            type: "int8"
                        },
                        {
                            name: "cpf",
                            type: "int8"
                        },
                        {
                            name: "profile",
                            type: "varchar(20)"
                        },
                        {
                            name: "active",
                            type: "boolean",
                            default: "true"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
