import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'
import { Product } from './product';


@Entity('Product_Category')
export class ProductCategory extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    @IsUUID()
    id: string

    @Column({
        name: 'Category_Code',
        type: 'nvarchar',
        length: 100,
        nullable: false,
        unique: true
    })
    @Length(100)
    category_code: string

    @Column({
        name: 'Category_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    category_name: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @Column({
        name: 'Is_Active',
        type: 'bit',
        nullable: true,
        default: 1
    })
    is_active: boolean

    @Column({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_delete: boolean

    @OneToMany(() => Product, (product) => product.category_product)
    products: Product[]
}