import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { Length, IsDate, IsNumber, IsUUID, IsInt } from 'class-validator'

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
        default: Date.now()
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
        default: Date.now()
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
        nullable: true,
        type: 'nvarchar',
        length: 50
    })
    @Length(50)
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

    @Column({
        name: 'Color_Code',
        type: 'nvarchar',
        length: 100,
        nullable: true
    })
    @Length(100)
    color_code: string

    @Column({
        name: 'Size_Code',
        type: 'nvarchar',
        length: 100,
        nullable: true
    })
    @Length(100)
    size_code: string

    @Column({
        name: 'Shop_Code',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    shop_code: string

    @Column({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    })
    is_delete: boolean
}