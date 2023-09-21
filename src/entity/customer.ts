import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { IsNumber, Length, IsUUID } from 'class-validator'

@Entity('Customer')
export class Customer extends BaseEntity{
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
        nullable: true,
        type: 'nvarchar',
        unique: true,
        length: 50,
        name: 'Customer_Code'
    })
    @Length(50)
    customer_code: string

    @Column({
        nullable: true,
        type: 'nvarchar',
        length: 50,
        name: 'Customer_Name'
    })
    @Length(50)
    customer_name: string

    @Column({
        nullable: true,
        type: 'numeric',
        unsigned: true,
        name: 'Age'
    })
    @IsNumber()
    age: number

    @Column({
        nullable: true,
        length: 50,
        type: 'nvarchar',
        name: 'Adress'
    })
    @Length(50)
    adress: string

    @Column({
        name: 'Sex',
        type: 'nchar',
        length: 10,
        nullable: true
    })
    sex: string

    @Column({
        nullable: true,
        type: 'nvarchar',
        length: 50,
        name: 'Job'
    })
    @Length(50)
    job: string
}