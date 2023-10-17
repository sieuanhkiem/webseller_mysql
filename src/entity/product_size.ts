import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsUUID, IsDate } from 'class-validator';
import { Product } from './product'
import { Inventory } from './inventory'
import { SalesPrice } from './sales_price';
import { SalesOrder } from './sales_order';

@Entity('Product_Size')
export class ProductSize extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    @IsUUID()
    id: string

    @Column({
        name: 'Size_Code',
        type: 'nvarchar',
        length: 100,
        unique: true,
        nullable: false
    })
    @Length(100)
    size_code: string

    @Column({
        name: 'Size_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    size_name: string

    @Column({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    comment: string

    // @Column({
    //     name: 'Product_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // product_code: string

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

    @ManyToOne(() => Product, (product) => product.product_sizes, { nullable: true, onDelete: 'CASCADE' })
    product: Product

    @OneToMany(() => SalesPrice, (salePrice) => salePrice.product_size)
    sales_price: SalesPrice[]
    
    @OneToMany(() => Inventory, (inventory) => inventory.product_size)
    inventories: Inventory[]

    @OneToMany(() => SalesOrder, (saleOrder) => saleOrder.product_size)
    sale_orders: SalesOrder[]
}