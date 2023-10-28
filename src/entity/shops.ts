import { Entity, Column, PrimaryColumn, BaseEntity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Length, IsUUID, IsDate } from 'class-validator'
import { Address } from './address';
import { Inventory } from './inventory';
import { SalesOrder } from './sales_order';

@Entity('Shops')
export class Shops extends BaseEntity {
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
        name: 'Shop_Code',
        type: 'nvarchar',
        unique: true,
        length: 100,
        nullable: false
    })
    @Length(100)
    shop_code: string

    @Column({
        name: 'Shop_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    shop_name: string

    // @Column({
    //     name: 'Brandch',
    //     type: 'nvarchar',
    //     length: 50,
    //     nullable: true
    // })
    // @Length(50)
    // brandch: string

    // @Column({
    //     name: 'Address_Code',
    //     type: 'nvarchar',
    //     length: 100,
    //     nullable: false
    // })
    // @Length(100)
    // address_code: string

    @Column({
        name: 'Tax',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    tax: string

    @Column({
        name: 'Telephone',
        type: 'nvarchar',
        length: 18,
        nullable: true
    })
    @Length(18)
    telephone: string

    @Column({
        name: 'Telephone1',
        type: 'nvarchar',
        length: 18,
        nullable: true
    })
    @Length(18)
    telephone1: string

    @Column({
        name: 'Slogan',
        type: 'nvarchar',
        length: 100,
        nullable: true
    })
    @Length(100)
    slogan: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @OneToOne(() => Address, { nullable: true })
    @JoinColumn()
    address: Address

    @OneToMany(() => Inventory, (inventory) => inventory.shop)
    inventories: Inventory[]

    // @OneToMany(() => SalesOrder, (saleOrder) => saleOrder.shop, { nullable: false })
    // sales_order: SalesOrder[]
}