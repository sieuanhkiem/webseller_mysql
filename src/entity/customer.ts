import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IsNumber, Length} from 'class-validator'

@Entity()
export class Customer{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: true})
    @Length(50)
    customer_code: string

    @Column({nullable: true})
    @Length(50)
    customer_name: string

    @Column({nullable: true})
    @IsNumber()
    age: number

    @Column({nullable: true})
    @Length(50)
    adress: string

    @Column({nullable: true})
    sex: string

    @Column({nullable: true})
    @Length(50)
    job: string
}