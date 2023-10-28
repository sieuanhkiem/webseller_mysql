import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CategoryService from '../../services/category.service';
import ProductService from '../../services/product.service';
import { ImageModel } from '../../models/image/image.model';
import SalePriceService from '../../services/sale_price.service';

export default class ProductAdminController {
    private static categoryService: CategoryService = new CategoryService();
    private static productService: ProductService = new ProductService();
    private static salePriceService: SalePriceService = new SalePriceService();
    public static async EditProduct(req: Request, res: Response) {
        try {
            const categories = await ProductAdminController.categoryService.GetAllCategory();
            const productCode: string | null = req.params.productcode || null;
            if(productCode != null) {
                let product = await ProductAdminController.productService.FindProductByCode(productCode);
                if(product == null) throw new Error(`Can not file product by code ${productCode}`);
                // console.log(product);
                return res.render('./admin/product_edit.ejs', { categories, product });
            }
            return res.render('./admin/product_new.ejs', { categories });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductAdminController.name}].[${ProductAdminController.EditProduct.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }

    public static async ListProduct(req: Request, res: Response) {
        try {
            const products = await ProductAdminController.productService.GetAllProduct();
            return res.render('./admin/product_list.ejs', { products });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductAdminController.name}].[${ProductAdminController.ListProduct.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }

    public static async SalePriceSize(req: Request, res: Response) {
        try {
            const productCode: string | null = req.params.productcode || null;
            if(productCode == null) throw new Error(`Can not found product code request`);
            const product = await ProductAdminController.productService.FindProductByCode(productCode);
            const salePrices = await ProductAdminController.salePriceService.GetSalePriceByProduct(productCode);
            if(product == null || product == undefined) throw new Error(`Can not found product by code ${productCode}`);
            return res.render('./admin/size_price.ejs', { product, salePrices });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductAdminController.name}].[${ProductAdminController.SalePriceSize.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}