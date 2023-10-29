import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'
import { District } from './district';
import { Ward } from './ward';
import { Address } from './address';

@Entity('City')
export class City extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'char',
        length: 36
    })
    @IsUUID()
    id: string

    @Column({
        name: 'City_Code',
        unique: true,
        type: 'nvarchar',
        length: 100,
        nullable: false
    })
    @Length(100)
    city_code: string

    @Column({
        name: 'City_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    city_name: string

    @Column({
        name: 'Create_Date',
        type: 'timestamp',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @OneToMany(() => District, (district) => district.city)
    districts: District[]

    @OneToMany(() => Ward, (ward) => ward.city)
    wards: Ward[]

    @OneToMany(() => Address, (address) => address.city)
    address: Address[]
}