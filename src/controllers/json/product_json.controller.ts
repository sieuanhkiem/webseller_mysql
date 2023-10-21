import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import ProductService from '../../services/product.service';

export default class ProductJsonController {
    private static productService: ProductService = new ProductService();
    public static async InsertProduct(req: Request, res: Response) {
        try {
            const strJsonEncrypt: string | null = req.body.product || null;
            if(strJsonEncrypt == null) throw new Error('Can not found product request');
            const productInsert: ProductNew = Common.decrypt(strJsonEncrypt);
            const productNew = await ProductJsonController.productService.InsertProduct(productInsert);
            if(productNew == false) throw new Error('Create product faild');
            return res.json({
                code: 200,
                product: Common.encrypt(productNew)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductJsonController.name}].[${ProductJsonController.InsertProduct.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }
}