import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class EmployeeMigration1694963187446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
          name: 'Employee',
          columns: [
            {
                name: 'Id',
                type: 'uniqueidentifier',
                isPrimary: true,
                isNullable: false
            },
            {
                name: 'Employee_Code',
                type: 'nvarchar(50)',
                isNullable: false
            },
            {
                name: 'Employee_Name',
                type: 'nvarchar(50)',
                isNullable: false
            },
            {
                name: 'Sex',
                type: 'nchar(10)',
                isNullable: true
            },
            {
                name: 'On_Board_Date',
                type: 'datetime',
                isNullable: true
            },
            {
                name: 'End_Job_Date',
                type: 'datetime',
                isNullable: true
            },
            {
                name: 'Birth_Day',
                type: 'nchar(10)',
                isNullable: true
            },
            {
                name: 'Position',
                type: 'nvarchar(50)',
                isNullable: true
            }
          ]  
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('Employee', true);
    }

}
