import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CustomerMigration1694943398207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'Customer',
            columns:[
                {
                    name: 'Id',
                    type: 'uniqueidentifier',
                    isPrimary: true
                },
                {
                    name: 'Customer_Code',
                    type: 'nvarchar(50)',
                    isNullable: true
                },
                {
                    name: 'Customer_Name',
                    type: 'nvarchar(50)',
                    isNullable: true
                },
                {
                    name: 'Age',
                    type: 'numeric(18, 0)',
                    isNullable: true
                },
                {
                    name: 'Adress',
                    type: 'nvarchar(50)',
                    isNullable: true
                },
                {
                    name: 'Sex',
                    type: 'nchar(10)',
                    isNullable: true
                },
                {
                    name: 'Job',
                    type: 'nvarchar(50)',
                    isNullable: true
                }
            ]
        }), true);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Customer', true);
    }

}
