import { Entity, JoinColumn, PrimaryColumn, BaseEntity, OneToOne, ManyToOne } from 'typeorm';
import { Product } from './product';
import { Image } from './image';
import { IsUUID } from 'class-validator';

@Entity('Image_Product')
export class ImageProduct extends BaseEntity {
    @PrimaryColumn('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'char',
        length: 36
    })
    @IsUUID()
    id: string

    @ManyToOne(() => Product, (product) => product, { onDelete: 'CASCADE' })
    product: Product

    @OneToOne(() => Image, { nullable: true })
    @JoinColumn()
    images: Image
}