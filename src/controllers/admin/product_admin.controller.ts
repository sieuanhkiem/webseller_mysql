import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CategoryService from '../../services/category.service';
import ProductService from '../../services/product.service';
import { ImageModel } from '../../models/image/image.model';

export default class ProductAdminController {
    private static categoryService: CategoryService = new CategoryService();
    private static productService: ProductService = new ProductService();
    public static async EditProduct(req: Request, res: Response) {
        try {
            const categories = await ProductAdminController.categoryService.GetAllCategory();
            const productCode: string | null = req.params.productcode || null;
            if(productCode != null) {
                let product = await ProductAdminController.productService.FindProductByCode(productCode);
                if(product == null) throw new Error(`Can not file product by code ${productCode}`);
                if(product!.images_product.length > 0) {
                    product!.images_product = product.images_product.map(image => {
                        const imageModel: ImageModel = new ImageModel(image.images)
                        imageModel.image_base64 = image.images.image.toString('base64');
                        image.images = imageModel;
                        return image;
                    })
                }
                console.log(product);
                return res.render('./admin/product_edit.ejs', { categories, product });
            }
            return res.render('./admin/product_new.ejs', { categories });
        } 
        catch (error: unknown) {
            logging.error(`[${ProductAdminController.name}].[${ProductAdminController.EditProduct.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}