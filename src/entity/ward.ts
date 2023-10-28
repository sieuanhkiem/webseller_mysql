import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsDate, IsUUID } from 'class-validator'
import { District } from "./district";
import { City } from "./city";
import { Address } from "./address";

@Entity('Ward')
export class Ward extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'char',
        length: 36
    })
    @IsUUID()
    id: string

    @Column({
        name: 'Ward_Code',
        unique: true,
        type: 'nvarchar',
        length: 100,
        nullable: false
    })
    @Length(100)
    ward_code: string

    @Column({
        name: 'Ward_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    ward_name: string

    @Column({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    })
    @IsDate()
    create_date: Date

    @ManyToOne(() => District, (district) => district.wards, { nullable: true })
    district: District

    @ManyToOne(() => City, (city) => city.wards, { nullable: true })
    city: City

    @OneToMany(() => Address, (address) => address.ward)
    address: Address[]
}