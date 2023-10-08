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
                error: (error as Error).stack
            });
        }
    }
}