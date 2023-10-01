import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'
import { Shops } from './shops';

@Entity('Address')
export class Address extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    @IsUUID()
    id: string

    @Column({
        name: 'Address_Code',
        type: 'nvarchar',
        nullable: false,
        unique: true,
        length: 100
    })
    @Length(100)
    address_code: string

    @Column({
        name: 'Address_1',
        type: 'nvarchar',
        nullable: true,
        length: 255
    })
    @Length(255)
    address_1: string

    @Column({
        name: 'Address_2',
        type: 'nvarchar',
        nullable: true,
        length: 255
    })
    @Length(255)
    address_2: string

    @Column({
        name: 'Address_3',
        type: 'nvarchar',
        nullable: true,
        length: 255
    })
    @Length(255)
    address_3: string

    @Column({
        name: 'City',
        type: 'nvarchar',
        nullable: true,
        length: 255
    })
    @Length(255)
    city: string


    @Column({
        name: 'State',
        type: 'nvarchar',
        nullable: true,
        length: 255
    })
    @Length(255)
    state: string

    @Column({
        name: 'Conutry',
        type: 'nvarchar',
        nullable: true,
        length: 255
    })
    @Length(255)
    conutry: string

    @Column({
        name: 'Portal_Code',
        type: 'nvarchar',
        nullable: true,
        length: 100
    })
    @Length(100)
    portal_code: string

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

    @OneToMany(() => Shops, (shop) => shop.address, { nullable: false })
    shops: Shops[]
}