import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import { ImageService } from '../../services/image.service';

export default class ImageJsonController {
    private static imageService: ImageService = new ImageService();
    public static async insertImageLogo(req: Request, res: Response) {
        try {
            const imageRequestEncrypt: string | null = req.body.image || null;
            if(imageRequestEncrypt == null) throw new Error(`Can not found image request body`);
            const imageNew: ImageNew = Common.decrypt(imageRequestEncrypt);
            const imageResult = await ImageJsonController.imageService.InsertImageLogo(imageNew);
            if(imageResult == false) throw new Error(`Insert image logo faild`);
            return res.json({
                code: 200,
                image: Common.encrypt(imageResult)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${ImageJsonController.name}].[${ImageJsonController.insertImageLogo.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            })
        }
    }

    public static async insertImageSlider(req: Request, res: Response) {
        try {
            const imageRequestEncrypt: string | null = req.body.images || null;
            if(imageRequestEncrypt == null) throw new Error(`Can not found image request body`);
            const imageNew: ImageNew[] = Common.decrypt(imageRequestEncrypt);
            const imageResult = await ImageJsonController.imageService.InsertImageSlider(imageNew);
            if(imageResult == false) throw new Error(`Insert image slider faild`);
            return res.json({
                code: 200,
                images: Common.encrypt(imageResult)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${ImageJsonController.name}].[${ImageJsonController.insertImageSlider.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            })
        }
    }
}