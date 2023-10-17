import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, LEGAL_TCP_SOCKET_OPTIONS } from 'typeorm';
import { Length, IsDate, IsUUID, IsInt } from 'class-validator'
import { Product } from './product';
import { ProductSize } from './product_size';

@Entity('Sales_Price')
export class SalesPrice extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    @IsUUID()
    id: string

    // @Column({
    //     name: 'Product_Num',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // product_num: string

    @Column({
        name: 'Sale_Code',
        type: 'nvarchar',
        nullable: false,
        unique: true
    })
    @Length(100)
    sale_code: string

    @Column({
        name: 'Sale_Price',
        type: 'int',
        unsigned: true,
        nullable: false
    })
    @IsInt()
    sale_price: number

    @Column({
        name: 'Curcency',
        type: 'nvarchar',
        length: 100,
        nullable: true,
        default: 'VNĐ'
    })
    curcency: string

    @Column({
        name: 'Price_Date',
        type: 'datetime',
        nullable: true,
    })
    @IsDate()
    price_date: Date

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
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_delete: boolean

    @Column({
        name: 'Is_Active',
        type: 'bit',
        nullable: true
    })
    is_active: boolean

    @ManyToOne(() => Product, (product) => product.sales_price, { nullable: true, onDelete: 'CASCADE' })
    product: Product

    @ManyToOne(() => ProductSize, (productSize) => productSize.sales_price, { nullable: true })
    product_size: ProductSize
}