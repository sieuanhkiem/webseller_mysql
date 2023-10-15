import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'
import { City } from './city';
import { District } from './district';
import { Ward } from './ward';

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

    @ManyToOne(() => City, (city) => city.address, { nullable: false, onDelete: 'CASCADE' })
    city: City

    @ManyToOne(() => District, (district) => district.address, { nullable: false, onDelete: 'CASCADE' })
    district: District

    @ManyToOne(() => Ward, (ward) => ward.address, { nullable: false, onDelete: 'CASCADE' })
    ward: Ward
}