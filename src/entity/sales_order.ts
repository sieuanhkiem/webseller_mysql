import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { Length, IsDate, IsUUID, IsInt } from 'class-validator'

@Entity('Sales Order')
export class SalesOrder extends BaseEntity {
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
        name: 'Transaction_Number',
        type: 'nvarchar',
        nullable: true,
        length: 50
    })
    @Length(50)
    transaction_number: string

    @Column({
        name: 'Transaction Date',
        type: 'datetime',
        nullable: true,
    })
    @IsDate()
    transaction_date: Date

    @Column({
        name: 'Sales_Order_Date',
        type: 'datetime',
        nullable: true,
    })
    @IsDate()
    sales_order_date: Date

    @Column({
        name: 'Delivery_Date',
        type: 'datetime',
        nullable: true,
    })
    @IsDate()
    delivery_date: Date

    @Column({
        name: 'Product Number',
        type: 'nvarchar',
        nullable: true,
        length: 50
    })
    @Length(50)
    product_number: string

    @Column({
        name: 'Created By',
        type: 'nvarchar',
        nullable: true,
        length: 50
    })
    @Length(50)
    created_by: string

    @Column({
        name: 'Create Date',
        type: 'datetime',
        nullable: true,
    })
    @IsDate()
    create_date: Date

    @Column({
        name: 'Last Update Date',
        type: 'datetime',
        nullable: false,
        default: Date.now()
    })
    @IsDate()
    last_update_date: Date

    @Column({
        name: 'Sales Quantity',
        type: 'int',
        nullable: true
    })
    @IsInt()
    sales_quantity: number

    @Column({
        name: 'Sales Amt',
        type: 'int',
        nullable: true
    })
    @IsInt()
    sales_amt: number

    @Column({
        name: 'Tax',
        type: 'nchar',
        nullable: true,
        length: 10
    })
    @Length(10)
    tax: string

    @Column({
        name: 'Transport Fee',
        type: 'int',
        nullable: true
    })
    @IsInt()
    transport_fee: number

    @Column({
        name: 'Loading Fee',
        type: 'int',
        nullable: true
    })
    @IsInt()
    loading_fee: number

    @Column({
        name: 'Customer Number',
        type: 'nvarchar',
        nullable: true,
        length: 50
    })
    @Length(50)
    customer_number: string

    @Column({
        name: 'Delete Flag',
        type: 'bit',
        nullable: true
    })
    delete_flag: boolean

    @Column({
        name: 'Cancel Flag',
        type: 'bit',
        nullable: true
    })
    cancel_flag: boolean
}