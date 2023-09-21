import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { Length, IsUUID } from 'class-validator'

@Entity('Product')
export class Product extends BaseEntity {
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
        name: 'Product_Code',
        type: 'nvarchar',
        length: 50,
        nullable: false,
        unique: true
    })
    @Length(50)
    product_code: string

    @Column({
        name: 'Product_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    product_name: string

    @Column({
        name: 'Product_Type',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    product_type: string

    @Column({
        name: 'Product Group',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    product_group: string

    @Column({
        name: 'Product Category',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    product_category: string

    @Column({
        name: 'Brand',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    brand: string

    @Column({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    comment: string
}