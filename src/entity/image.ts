import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm';
import { Length, IsUUID, IsDate } from 'class-validator';

@Entity('Image')
export class Image extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
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
        type: 'image',
        nullable: true
    })
    image: Buffer

    @Column({
        name: 'Image_Type',
        type: 'nvarchar',
        length: 50,
        nullable: true
    })
    @Length(50)
    image_type: string

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
}