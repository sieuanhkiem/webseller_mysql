import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import config from '../../config/config';

export default class ProductController {
    public static async index(req: Request, res: Response) {
        return res.render('./client/product.ejs');
    }
}