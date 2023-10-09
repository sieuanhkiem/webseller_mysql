import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CategoryService from '../../services/category.service';

export default class CartController {
    private static categoryService: CategoryService = new CategoryService();
    public static async ShowCart(req: Request, res: Response) {
        try {
            const cart: Cart = req.session.cart || { totalPrice: 0, cartItem: [], totalItem: 0 };
            // console.log(cart);
            const category = await CartController.categoryService.GetAllCategory();
            return res.render('./client/cart.ejs', { cart, category })
        } 
        catch (error: unknown) {
            logging.error(`[${CartController.name}].[${CartController.ShowCart.name}]: ${error}`);
            return res.redirect('/page_error')
        }
    }
}