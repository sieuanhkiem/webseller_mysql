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

    public static async DeleteImageAndColorOfProduct(req: Request, res: Response) {
        try {
            const strJsonEncrypt: string | null = req.body.product || null;
            if(strJsonEncrypt == null) throw new Error('Can not found product request');
            const productUpdate: ProductUpdate = Common.decrypt(strJsonEncrypt);
            const result: boolean | number = await ProductJsonController.productService.DeleteImageAndColorProduct(productUpdate);
            if(result == false) throw new Error(`Delete image and color of product ${productUpdate.product_code} faild`);
            return res.json({
                code: 200,
                responseText: 'Delete success'
            });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductJsonController.name}].[${ProductJsonController.DeleteImageAndColorOfProduct.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }

    public static async UpdateProduct(req: Request, res: Response) {
        try {
            const strJsonEncrypt: string | null = req.body.product || null;
            if(strJsonEncrypt == null) throw new Error('Can not found product request');
            const productUpdate: ProductNew = Common.decrypt(strJsonEncrypt);
            const product = await ProductJsonController.productService.UpdateProduct(productUpdate);
            if(product == null) throw new Error(`Update product by code ${productUpdate.product_code} faild`);
            return res.json({
                code: 200,
                product: Common.encrypt(product)
            })
        } 
        catch (error: unknown) {
            logging.error(`[${ProductJsonController.name}].[${ProductJsonController.UpdateProduct.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }

    public static async DeleteProduct(req: Request, res: Response) {
        try {
            const productCodeEncrypt: string | null = req.body.product_code || null;
            if(productCodeEncrypt == null) throw new Error('Can not found product code request');
            const productCode: string = Common.decrypt(productCodeEncrypt);
            const result: boolean = await ProductJsonController.productService.DeleteProduct(productCode);
            if(result == false) throw new Error(`Delete product by code ${productCode} faild`);
            return res.json({
                code: 200,
                responseText: 'Delete thành công'
            });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductJsonController.name}].[${ProductJsonController.DeleteProduct.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack
            });
        }
    }
}