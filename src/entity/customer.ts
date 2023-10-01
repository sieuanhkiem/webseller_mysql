import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { IsNumber, Length, IsUUID , IsDate } from 'class-validator'
import { SalesOrder } from './sales_order';

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
        length: 100,
        name: 'Customer_Code'
    })
    @Length(100)
    customer_code: string

    @Column({
        nullable: true,
        type: 'nvarchar',
        length: 255,
        name: 'Customer_Name'
    })
    @Length(255)
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

    @Column({
        name: 'Telephone1',
        type: 'nvarchar',
        length: 18,
        nullable: true
    })
    @Length(18)
    telephone1: string

    @Column({
        name: 'Telephone2',
        type: 'nvarchar',
        length: 18,
        nullable: true
    })
    @Length(18)
    telephone2: string

    @Column({
        name: 'Is_Delete',
        type: 'bit',
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

    @OneToMany(() => SalesOrder, (saleOrder) => saleOrder.customer)
    sales_orders: SalesOrder[]
}