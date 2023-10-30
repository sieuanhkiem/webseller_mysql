import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import config from '../../config/config';
import ProductService from '../../services/product.service';
import CategoryService from '../../services/category.service';
import { ImageService } from '../../services/image.service';

export default class ProductController {
    private static productService: ProductService = new ProductService();
    private static categoryService: CategoryService = new CategoryService();
    private static imageService: ImageService = new ImageService();
    public static async index(req: Request, res: Response) {
        try {
            const productCode: string | null = req.params.productcode || null;
            if(productCode == null) throw new Error('Can not find product code');
            const productDetail = await ProductController.productService.GetDetailsProduct(productCode);
            if(productDetail == null || productDetail == undefined) throw new Error(`Can not find product by ${productCode}`);
            const productRand = await ProductController.productService.GetRandomProduct();
            const category = await ProductController.categoryService.GetAllCategory();
            const categoriesWithProduct = await ProductController.categoryService.GetProductWithCategory();
            const imageLogo = await ProductController.imageService.GetImageLogo();
            return res.render('./client/product.ejs', { productDetail, productRand, category, categoriesWithProduct, imageLogo });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductController.name}].[${ProductController.index.name}]: ${error}`)
            res.redirect('/page_error');   
        }
    }
}