import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsUUID, IsDate, IsInt } from 'class-validator';

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
        name: 'Product_Price',
        nullable: true,
        type: 'int',
        unsigned: true
    })
    @IsInt()
    product_price: number

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
        name: 'Product_Category',
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

    @Column({
        name: 'Product_Image',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(100)
    image: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: Date.now()
    })
    @IsDate()
    create_date: Date
}