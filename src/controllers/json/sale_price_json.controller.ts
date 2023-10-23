import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import SalePriceService from '../../services/sale_price.service';



export default class SalePriceJsonController {

    private static salePriceService: SalePriceService = new SalePriceService();

    public static async SalePriceBySizeCode(req: Request, res: Response) {
        try {
            const productCode: string = req.body.product_code || '';
            const sizeCode: string = req.body.size_code || '';
            const salePrice = await SalePriceJsonController.salePriceService.GetSalePriceBySizeCode(productCode, sizeCode);
            if(salePrice == null) throw new Error(`Can not find sale price of product size ${sizeCode}`);
            return res.json({
                code: 200,
                result: Common.encrypt(salePrice)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceJsonController.name}].[${SalePriceJsonController.SalePriceBySizeCode.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }

    public static async InsertSalePriceAndSize(req: Request, res: Response) {
        try {
            const sizePriceEncrypt: string | null = req.body.size_price || null;
            if(sizePriceEncrypt == null) throw new Error('Can not found size price request');
            const sizePrice: SizePriceNew = Common.decrypt(sizePriceEncrypt);
            const salePrice = await SalePriceJsonController.salePriceService.InsertSalePriceAndSize(sizePrice);
            if(salePrice == null) throw new Error('Insert sale price and size product faild');
            return res.json({
                code: 200,
                salePrice: Common.encrypt(salePrice)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceJsonController.name}].[${SalePriceJsonController.InsertSalePriceAndSize}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }

    public static async DeleteSizeAndPrice(req: Request, res: Response) {
        try {
            const sizePriceEncrypt: string | null = req.body.size_price || null;
            if(sizePriceEncrypt == null) throw new Error('Can not found size price request');
            const sizePrice: SizePriceDelete = Common.decrypt(sizePriceEncrypt);
            const resultDelete: boolean = await SalePriceJsonController.salePriceService.DeleteSalePriceProduct(sizePrice);
            if(resultDelete == false) throw new Error(`Delete size product by code ${sizePrice.size_code} faild`);
            return res.json({
                code: 200,
                responseText: 'Delete size và giá thành công'
            });
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceJsonController.name}].[${SalePriceJsonController.DeleteSizeAndPrice}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }
}