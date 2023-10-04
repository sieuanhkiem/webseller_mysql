import e, { Request, Response } from 'express';
import { logging } from '../../config/logging'
import { SessionData } from 'express-session';
import { Common } from '../../common/common_extendsion'

export default class SessionController {
    public static getSessionCart(req: Request, res: Response) {
        // req.session.cart = [
        //     {
        //         itemCode: '1',
        //         quantity: 1,
        //         price: 2000
        //     }
        // ];
        // req.session.save();
        if(!req.session.cart) {
            req.session.cart = {
                totalItem: 0,
                totalPrice: 0,
                cartItem: []
            };
        }
        
        return res.json({
            cart: Common.encrypt(req.session.cart)
        });
    }

    public static pushSessionCart(req: Request, res: Response) {
        try {
            const cartEncrypt: string = req.body.cart || null;
            if(cartEncrypt == null) throw Error('Request body is empty');
            const cartItem: CartItem = Common.decrypt(cartEncrypt) as CartItem;
            if(req.session.cart) {
                logging.info('đã nhận session store');
                const index = req.session.cart.cartItem.findIndex(product => product.productCode == cartItem.productCode && product.sizeCode == cartItem.sizeCode && product.colorCode == cartItem.colorCode);
                if(index > -1) req.session.cart.cartItem[index].quantity += cartItem.quantity;
                else req.session.cart.cartItem.push(cartItem);
                req.session.cart.totalItem = req.session.cart.cartItem.reduce(function (count: number, cartItem: CartItem) {
                    return count + cartItem.quantity;
                } , 0);
                // req.session.cart.totalPrice = req.session.cart.cartItem.reduce(function (totalPrice: number, cartItem: CartItem) {
                //     return totalPrice + cartItem.price;
                // } , 0);
            }
            else {
                req.session.cart = {
                    totalItem: 0,
                    totalPrice: 0,
                    cartItem: []
                };
                req.session.cart.cartItem.push(cartItem);
            }
            return res.json({ 
                cart: Common.encrypt(req.session.cart) 
            });
        } 
        catch (error: unknown) {
            logging.error(`[${SessionController.name}].[${SessionController.pushSessionCart.name}]: ${error}`);
            return res.json({ code: 500, error })
        }
    }

    public static removeSessionCart(req: Request, res: Response) {
        const cartItem: CartItem = req.body;
        if(req.session.cart) {
            if(req.session.cart.cartItem.length > 0) {
                const index = req.session.cart.cartItem.findIndex(itItem => itItem.productCode == cartItem.productCode && itItem.sizeCode == cartItem.sizeCode && itItem.colorCode == cartItem.colorCode);
                if(index > 0) {
                    req.session.cart.cartItem.slice(index, 1);
                }
            }
        }
        return res.json({
            cart: Common.encrypt(req.session.cart)
        });
    }


    public static clearCartSession(req: Request, res: Response) {
        if(req.session.cart) req.session.cart.cartItem = [];
        else {
            req.session.cart = {
                totalItem: 0,
                totalPrice: 0,
                cartItem: []
            };
        }
        return res.json({
            cart: Common.encrypt(req.session.cart)
        });
    }
}