import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import config from '../../config/config';
import ProducService from '../../services/product.service';

export default class CategoryController {
    private static productService: ProducService = new ProducService();

    public static async index(req: Request, res: Response) {
        try {
            const page:number = parseInt(req.params.page || '1');
            const categoryCode: string = req.params.categorycode;
            const productPagination = await CategoryController.productService.GetProductByNumberPage(page, config.quantityofpage, categoryCode);
            productPagination.maxPage = 10;
            return res.render('./client/category.ejs', { product: productPagination });
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryController.name}].[${CategoryController.index.name}]: ${error}`);
            res.redirect('/page_error');
        }
    }
}