import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Length, IsUUID, IsDate, IsInt } from 'class-validator';
import { Product } from '../entity/product';

@Entity('Image')
export class Image extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'char',
        length: 36
    })
    @IsUUID()
    id: string


    @Column({
        name: 'Image_Code',
        type: 'nvarchar',
        length: 100,
        unique: true,
        nullable: false
    })
    @Length(100)
    image_code: string


    @Column({
        name: 'Image_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    })
    @Length(255)
    image_name: string

    @Column({
        name: 'Image',
        type: 'longblob',
        nullable: true
    })
    image: Buffer

    @Column({
        name: 'Image_Type',
        type: 'int',
        unsigned: true,
        nullable: true
    })
    @IsInt()
    image_type: number

    @Column({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    })
    @Length(255)
    comment: string

    @Column({
        name: 'Is_Delete',
        type: 'tinyint',
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

    @Column({
        name: 'Image_Default',
        type: 'tinyint',
        nullable: true,
        default: 0
    })
    image_default: boolean

    // @ManyToOne(() => Product, (product) => product.images, { nullable: false })
    // product: Product
}