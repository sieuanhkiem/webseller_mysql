import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Length, IsDate, IsUUID, IsInt } from 'class-validator';
import { Product } from './product';
import { Shops } from './shops';
import { Inventory } from './inventory';
import { Customer } from './customer';
import { ProductSize } from './product_size';

@Entity('Sales_Order')
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
        name: 'Sale_Order_Code',
        type: 'nvarchar',
        nullable: false,
        length: 100
    })
    @Length(100)
    transaction_number: string

    // @Column({
    //     name: 'Transaction_Date',
    //     type: 'datetime',
    //     nullable: true,
    //     default: Date.now()
    // })
    // @IsDate()
    // transaction_date: Date

    @Column({
        name: 'Sale_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    sale_date: Date

    @Column({
        name: 'Delivery_Date',
        type: 'datetime',
        nullable: true,
        // default: Date.now()
    })
    @IsDate()
    delivery_date: Date

    // @Column({
    //     name: 'Product_Num',
    //     type: 'nvarchar',
    //     nullable: false,
    //     length: 100
    // })
    // @Length(100)
    // product_num: string

    @Column({
        name: 'Created_By',
        type: 'nvarchar',
        nullable: true,
        length: 100,
        default: 'admin'
    })
    @Length(100)
    created_by: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @Column({
        name: 'Last_Update',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    last_update: Date

    @Column({
        name: 'Quantity',
        type: 'int',
        unsigned: true,
        nullable: true
    })
    @IsInt()
    quantity: number

    @Column({
        name: 'Amount',
        type: 'int',
        unsigned: true,
        nullable: true
    })
    @IsInt()
    amount: number

    @Column({
        name: 'Tax',
        type: 'int',
        unsigned: true,
        nullable: true,
        default: 5
    })
    @IsInt()
    tax: number

    @Column({
        name: 'Transport_Fee',
        type: 'bit',
        nullable: true,
        default : 0
    })
    transport_fee: boolean

    // @Column({
    //     name: 'Customer_Number',
    //     type: 'nvarchar',
    //     nullable: false,
    //     length: 100
    // })
    // @Length(100)
    // customer_number: string

    @Column({
        name: 'Salesman',
        type: 'nvarchar',
        length: 100,
        nullable: false,
        default: 'admin'
    })
    @Length(100)
    salesman: string

    // @Column({
    //     name: 'Shop_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // shop_code: string

    @Column({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_delete: boolean

    @Column({
        name: 'Is_Cancle',
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_cancle: boolean

    @Column({
        name: 'status',
        type: 'int',
        nullable: true,
        default: 1
    })
    status: number

    @ManyToOne(() => Product, (product) => product.sales_order, { nullable: false })
    product: Product

    @ManyToOne(() => ProductSize, (productSize) => productSize.sale_orders, { nullable: false})
    product_size: ProductSize

    @ManyToOne(() => Inventory, (inventory) => inventory.sales_order, { nullable: true })
    inventory: Inventory

    @ManyToOne(() => Customer, (customer) => customer.sales_orders, { nullable: false })
    customer: Customer
}