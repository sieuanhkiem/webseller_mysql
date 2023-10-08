import express, { Router, Request, Response, NextFunction } from 'express';
import DeliveryController from '../../controllers/client/delivery.controller';

const deliveryRoute: Router = express.Router();

deliveryRoute.get('/', function (req: Request, res: Response, next: NextFunction) {
    if(req.session.cart == undefined || req.session.cart == null || req.session.cart.cartItem.length == 0) return res.redirect('/page_error');
    next();
} ,DeliveryController.index);

deliveryRoute.post('/post_delivery', DeliveryController.postDelivery);

export default deliveryRoute;