import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Length, IsUUID, IsDate, IsInt } from 'class-validator';
import { ProductSize } from './product_size';
import { SalesPrice } from './sales_price';
import { SalesOrder } from './sales_order';
import { ImageProduct } from './image_product';
import { Inventory } from './inventory';
import { ProductCategory } from './product_category';
import { ProductColor } from './product_color';
 
@Entity('Product')
export class Product extends BaseEntity {
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
        name: 'Product_Code',
        type: 'nvarchar',
        length: 100,
        nullable: false,
        unique: true
    })
    @Length(100)
    product_code: string

    @Column({
        name: 'Product_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    product_name: string


    // @Column({
    //     name: 'Product_Price',
    //     nullable: false,
    //     type: 'int',
    //     unsigned: true
    // })
    // @IsInt()
    // product_price: number

    @Column({
        name: 'Product_Type',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    product_type: string

    @Column({
        name: 'Product_Group',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    product_group: string

    // @Column({
    //     name: 'Category_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // category_code: string

    @Column({
        name: 'Brand',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    brand: string

    @Column({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    comment: string

    // @Column({
    //     name: 'Product_Image',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: true
    // })
    // @Length(100)
    // image: string

    @Column({
        name: 'Preserve',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    preserve: string

    @Column({
        name: 'Is_Delete',
        type: 'tinyint',
        nullable: true,
        default: 0
    })
    is_delete: boolean

    @Column({
        name: 'Create_Date',
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @OneToMany(() => ProductSize, (productSize) => productSize.product)
    product_sizes : ProductSize[]

    @OneToMany(() => SalesPrice, (salePrice) => salePrice.product)
    sales_price: SalesPrice[]

    @OneToMany(() => SalesOrder, (saleOrder) => saleOrder.product)
    sales_order: SalesOrder[]

    // @ManyToMany(() => Image)
    // @JoinTable()
    // images:Image[]

    @OneToMany(() => ImageProduct, (imageProduct) => imageProduct.product)
    images_product: ImageProduct[]

    @OneToMany(() => Inventory, (invetory) => invetory.product)
    inventoris: Inventory[]

    @ManyToOne(() => ProductCategory, (productCateogry) => productCateogry.products, { nullable: true })
    category_product: ProductCategory | null

    @ManyToMany(() => ProductColor, { onDelete: 'CASCADE' })
    @JoinTable()
    product_colors: ProductColor[]
}