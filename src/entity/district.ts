import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'
import { City } from './city';
import { Ward } from './ward';
import { Address } from './address';

@Entity('District')
export class District extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    @IsUUID()
    id: string

    @Column({
        name: 'District_Code',
        unique: true,
        type: 'nvarchar',
        length: 100,
        nullable: false
    })
    @Length(100)
    district_code: string

    @Column({
        name: 'District_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    district_name: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @ManyToOne(() => City, (city) => city.districts, { nullable: false, onDelete: 'CASCADE' })
    city: City

    @OneToMany(() => Ward, (ward) => ward.district, { nullable: false })
    wards: Ward[]

    @OneToMany(() => Address, (adress) => adress.district, { nullable: false })
    address: Address[]
}