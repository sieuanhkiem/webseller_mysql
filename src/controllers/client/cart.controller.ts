import { Request, Response } from 'express';
import { logging } from '../../config/logging';

export default class CartController {
    public static ShowCart(req: Request, res: Response) {
        try {
            
            return res.render('./client/cart.ejs')
        } 
        catch (error: unknown) {
            logging.error(`[${CartController.name}].[${CartController.ShowCart.name}]: ${error}`);
            return res.redirect('/page_error')
        }
    }
}