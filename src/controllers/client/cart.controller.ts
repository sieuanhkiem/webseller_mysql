import { Request, Response } from 'express';
import { logging } from '../../config/logging';

export default class CartController {
    public static ShowCart(req: Request, res: Response) {
        try {
            const cart: Cart = req.session.cart || { totalPrice: 0, cartItem: [], totalItem: 0 };
            console.log(cart);
            return res.render('./client/cart.ejs', { cart })
        } 
        catch (error: unknown) {
            logging.error(`[${CartController.name}].[${CartController.ShowCart.name}]: ${error}`);
            return res.redirect('/page_error')
        }
    }
}