import { table } from "console";
import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1763426761804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "user",
            columns: [
                {
                    name: "id_usuario",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "id_empresa",
                    type: "int",
                },
                {
                    name: "nome",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "senha",
                    type: "varchar",
                },
                {
                    name: "tipo",
                    type: "varchar",
                },
                {
                    name: "data_cadastro",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
            ]
        })
    )}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
