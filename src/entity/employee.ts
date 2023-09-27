import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'

@Entity('Employee')
export class Employee extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    // @Column({
    //     name: 'Id',
    //     type: 'uniqueidentifier',

    // })
    @IsUUID()
    id: string

    @Column({
        name: 'Employee_Code',
        type: 'nvarchar',
        unique: true,
        length: 50,
        nullable: false
    })
    @Length(50)
    employee_code: string

    @Column({
        name: 'Employee_Name',
        type: 'nvarchar',
        length: 50,
        nullable: false
    })
    @Length(50)
    employee_name: string

    @Column({
        name: 'Sex',
        type: 'nchar',
        length: 10,
        nullable: true
    })
    @Length(10)
    sex: string

    @Column({
        name: 'On_Board_Date',
        type: 'datetime',
        nullable: true,
        default: Date.now()
    })
    @IsDate()
    on_board_date: Date

    @Column({
        name: 'End_Job_Date',
        type: 'datetime',
        nullable: true
    })
    @IsDate()
    end_job_date: Date

    @Column({
        name: 'Birth_Day',
        type: 'nchar',
        length: 10,
        nullable: true
    })
    @Length(10)
    birth_day: string

    @Column({
        name: 'Position',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    position: string
}