import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CategoryService from '../../services/category.service';
import { ImageService } from '../../services/image.service';

export default class CartController {
    private static categoryService: CategoryService = new CategoryService();
    private static imageService: ImageService = new ImageService();
    public static async ShowCart(req: Request, res: Response) {
        try {
            const cart: Cart = req.session.cart || { totalPrice: 0, cartItem: [], totalItem: 0 };
            // console.log(cart);
            const category = await CartController.categoryService.GetAllCategory();
            const categoriesWithProduct = await CartController.categoryService.GetProductWithCategory();
            const imageLogo = await CartController.imageService.GetImageLogo();
            return res.render('./client/cart.ejs', { cart, category, categoriesWithProduct, imageLogo })
        } 
        catch (error: unknown) {
            logging.error(`[${CartController.name}].[${CartController.ShowCart.name}]: ${error}`);
            return res.redirect('/page_error')
        }
    }
}