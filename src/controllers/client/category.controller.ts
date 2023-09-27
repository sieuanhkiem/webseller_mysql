import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import config from '../../config/config';
import ProducService from '../../services/product.service';

export default class CategoryController {
    private static productService: ProducService = new ProducService();

    public static async index(req: Request, res: Response) {
        const page:number = parseInt(req.params.page || '1');
        const categoryCode: string = req.params.categorycode;
        const productPagination = await CategoryController.productService.GetProductByNumberPage(page, config.quantityofpage, categoryCode);
        return res.render('./client/category.ejs', { product: productPagination });
    }
}