import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { Length, IsUUID } from 'class-validator'

@Entity('Shops')
export class Shops extends BaseEntity {
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
        name: 'Shop Code',
        type: 'nvarchar',
        unique: true,
        length: 50,
        nullable: false
    })
    @Length(50)
    shop_code: string

    @Column({
        name: 'Shop Name',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    shop_name: string

    @Column({
        name: 'Brandch',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    brandch: string

    @Column({
        name: 'Address',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    address: string

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
}