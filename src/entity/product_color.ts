import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsUUID, IsDate } from 'class-validator'
import { Inventory } from './inventory';

@Entity('Product_Color')
export class ProductColor extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    @IsUUID()
    id: string

    @Column({
        name: 'Color_Code',
        type: 'nvarchar',
        length: 100,
        unique: true,
        nullable: false
    })
    @Length(100)
    color_code: string

    @Column({
        name: 'Color_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    color_name: string

    @Column({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    comment: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @OneToMany(() => Inventory, (inventory) => inventory.product_color, { nullable: false })
    inventories: Inventory[]
}