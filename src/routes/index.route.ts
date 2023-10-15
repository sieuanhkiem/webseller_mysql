import { Express } from 'express';
import mainRoute from './client/main.route';
import categoryRoute from './client/category.route';
import productRoute from './client/product.route';
import page_err from './client/page_error.route';
import sessionRoute from './session/session.route';
import cartRoute from './client/cart.route';
import deliveryRoute from './client/delivery.route';
import finalRoute from './client/final.route';
import jsonRoute from './json/json.route';
import adminRoute from './admin/admin.route';

export function AddRouteClient(mainApp: Express) {
    mainApp.use('', mainRoute);
    mainApp.use('/category', categoryRoute);
    mainApp.use('/product', productRoute);
    mainApp.use('/cart', cartRoute);
    mainApp.use('/delivery', deliveryRoute);
    mainApp.use('/final', finalRoute);
    mainApp.use('/page_error', page_err);
}

export function AddRouteSession(mainApp: Express) {
    mainApp.use('/session', sessionRoute);
}

export function AddRouteJson(mainApp: Express) {
    mainApp.use('/json', jsonRoute);
}

export function AdRoutedAdmin(mainApp: Express) {
    mainApp.use('/admin', adminRoute)
}