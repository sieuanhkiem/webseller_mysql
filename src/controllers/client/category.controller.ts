import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import config from '../../config/config';
import ProducService from '../../services/product.service';
import CategoryService from '../../services/category.service';
import { Order } from '../../enum/order';
import { ImageService } from '../../services/image.service';

export default class CategoryController {
    private static productService: ProducService = new ProducService();
    private static categoryService: CategoryService = new CategoryService();
    private static imageService: ImageService = new ImageService();

    public static async index(req: Request, res: Response) {
        try {
            console.log(req.params);
            const page:number = parseInt(req.params.page || '1');
            const order: Order =  (req.params.order || Order.ASC) as Order;
            const categoryCode: string = req.params.categorycode;
            const categoriesProduct = await CategoryController.categoryService.GetAllCategory();
            if(categoriesProduct == null || categoriesProduct == undefined) throw Error('Category can not query');
            const currentCategory = categoriesProduct.find(category => category.category_code == categoryCode);
            if(currentCategory == null || currentCategory == undefined) throw new Error('Category code is not found');
            const productPagination = await CategoryController.productService.GetProductByNumberPage(page, config.quantityofpage, categoryCode, order);
            const categoriesWithProduct = await CategoryController.categoryService.GetProductWithCategory();
            const imageLogo = await CategoryController.imageService.GetImageLogo();
            return res.render('./client/category.ejs', { product: productPagination, category: { categoriesProduct, currentCategory }, quantityOfPage:  config.quantityofpage, order, categoriesWithProduct, imageLogo });
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryController.name}].[${CategoryController.index.name}]: ${error}`);
            res.redirect('/page_error');
        }
    }
}