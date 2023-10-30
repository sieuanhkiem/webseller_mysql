import { Image } from "../entity/image";
import BaseService from "./base.service";
import { logging } from '../config/logging';
import { Repository } from "typeorm";
import { ImageType } from "../enum/entity";
import { Common } from '../common/common_extendsion';
import { ImageModel } from "../models/image/image.model";


export class ImageService extends BaseService {

    public async GetImageSlider(): Promise<ImageModel[]> {
        try {
            let resultImage: ImageModel[] = [];
            await super.connectDatabase();
            const repositoryImage: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const imagesSilder: Image[] = await repositoryImage.createQueryBuilder()
            .where('image_type = :imageType', { imageType: ImageType.SLIDERTYPE })
            .limit(6)
            .getMany();

            for(let image of imagesSilder) {
                const imageModel: ImageModel = new ImageModel(image);
                if(image.image != null) imageModel.image_base64 = image.image.toString('base64');
                resultImage.push(imageModel);
            }
            await super.disconnectDatabase();
            return resultImage;
        } 
        catch (error) {
            logging.error(`[${ImageService.name}].[${this.GetImageSlider.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async GetImageLogo(): Promise<ImageModel | null> {
        try {
            await super.connectDatabase();
            const repositoryImage: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const image: Image = await repositoryImage.createQueryBuilder()
            .where('image_type = :imageType', { imageType: ImageType.LOGOTYPE })
            .getOneOrFail();
            await super.disconnectDatabase();
            let imageModel: ImageModel = new ImageModel(image);
            if(image.image != null) imageModel.image_base64 = image.image.toString('base64');
            return imageModel;
        } 
        catch (error: unknown) {
            logging.error(`[${ImageService.name}].[${this.GetImageLogo.name}]: ${error}`);
            await super.disconnectDatabase();
            return null
        }
    }

    public async InsertImageLogo(imageNew: ImageNew): Promise<Image | boolean> {
        try {
            await super.connectDatabase();
            const imageRepository: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            await imageRepository.createQueryBuilder().delete().where('image_type = :imageType', { imageType: ImageType.LOGOTYPE }).execute();
            const countImage: number = await imageRepository.count();
            let imageLogo: Image = new Image();
            imageLogo.image_name = imageNew.image_name;
            imageLogo.image = Buffer.from(imageNew.buffer, 'base64');
            imageLogo.image_type = ImageType.LOGOTYPE;
            imageLogo.image_code = `IMG-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countImage + 1, 6)}`;
            imageLogo = await imageRepository.save(imageLogo);
            await super.disconnectDatabase();
            return imageLogo;
        } 
        catch (error: unknown) {
            logging.error(`[${ImageService.name}].[${this.InsertImageLogo.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async InsertImageSlider(images: ImageNew[]): Promise<Image[] | boolean> {
        try {
            await super.connectDatabase();
            const imageRepository: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const imageInsert: Image[] = [];
            for(let imageNew of images) {
                const countImage: number = await imageRepository.count();
                let imageLogo: Image = new Image();
                imageLogo.image_name = imageNew.image_name;
                imageLogo.image = Buffer.from(imageNew.buffer, 'base64');
                imageLogo.image_type = ImageType.SLIDERTYPE;
                imageLogo.image_code = `IMG-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countImage + 1, 6)}`;
                imageLogo = await imageRepository.save(imageLogo);
                imageInsert.push(imageLogo);
            }
            await super.disconnectDatabase();
            return imageInsert;
        } 
        catch (error: unknown) {
            logging.error(`[${ImageService.name}].[${this.InsertImageSlider.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }
}