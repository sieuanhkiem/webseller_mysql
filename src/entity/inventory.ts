import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Length, IsDate, IsNumber, IsUUID, IsInt } from 'class-validator';
import { Product } from './product';
import { Shops } from './shops';
import { ProductColor } from './product_color';

@Entity('Inventory')
export class Inventory extends BaseEntity {
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
        name: 'Transaction_Date',
        nullable: true,
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    transaction_date: Date

    @Column({
        name: 'Created_By',
        nullable: true,
        type: 'nvarchar',
        length: 50
    })
    @Length(50)
    create_by: string

    @Column({
        name: 'Create_Date',
        nullable: true,
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @Column({
        name: 'Transaction_Type',
        nullable: true,
        type: 'nvarchar',
        length: 50
    })
    @Length(50)
    transaction_type: string

    @Column({
        name: 'Product_Num',
        nullable: false,
        type: 'nvarchar',
        length: 100
    })
    @Length(100)
    product_num: string

    @Column({
        name: 'Quantity',
        nullable: true,
        type: 'numeric',
        unsigned: true
    })
    @IsNumber()
    quantity: number

    @Column({
        name: 'Amount',
        nullable: true,
        type: 'int',
        unsigned: true
    })
    @IsInt()
    amount: number

    @Column({
        name: 'Price',
        nullable: false,
        type: 'int',
        unsigned: true
    })
    @IsInt()
    price: number

    @Column({
        name: 'Currenry',
        type: 'nvarchar',
        length: 30,
        nullable: true
    })
    @Length(30)
    currenry: string

    // @Column({
    //     name: 'Color_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // color_code: string

    // @Column({
    //     name: 'Size_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // size_code: string

    // @Column({
    //     name: 'Shop_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(50)
    // shop_code: string

    @Column({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_delete: boolean

    @ManyToOne(() => Product, (product) => product.inventoris, { nullable: false })
    product: Product

    @ManyToOne(() => Shops, (shop) => shop.inventories, { nullable: false })
    shop: Shops

    @ManyToOne(() => ProductColor, (productColor) => productColor.inventories, { nullable: false })
    product_color: Product
}