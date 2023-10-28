import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'

@Entity('Employee')
export class Employee extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'char',
        length: 36
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
        length: 100,
        nullable: false
    })
    @Length(100)
    employee_code: string

    @Column({
        name: 'Employee_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
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
        name: 'Start_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    start_date: Date

    @Column({
        name: 'End_Date',
        type: 'datetime',
        nullable: true
    })
    @IsDate()
    end_date: Date

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

    @Column({
        name: 'Is_Active',
        type: 'tinyint',
        nullable: true,
        default: 1
    })
    is_active: boolean


    @Column({
        name: 'Is_Delete',
        type: 'tinyint',
        nullable: true,
        default: 0
    })
    is_delete: boolean

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date
}