import express, { Router } from 'express';
import CategoryAdminController from '../../controllers/admin/category_admin.controller';
import MainController from '../../controllers/admin/main_admin.controller';
import ProductAdminController from '../../controllers/admin/product_admin.controller';
import ImageAdminController from '../../controllers/admin/image_admin.controller';

const adminRoute: Router = express.Router();

adminRoute.get('/', MainController.index);
// category
adminRoute.get('/category/list', CategoryAdminController.ListCategory);
adminRoute.get('/category/new', CategoryAdminController.EditCategory);
adminRoute.get('/category/update/:categorycode', CategoryAdminController.EditCategory);
adminRoute.get('/product/new', ProductAdminController.EditProduct);
adminRoute.get('/product/update/:productcode', ProductAdminController.EditProduct);
adminRoute.get('/product/list', ProductAdminController.ListProduct);
adminRoute.get('/product/size-price/:productcode', ProductAdminController.SalePriceSize);
adminRoute.get('/image/logo', ImageAdminController.imageLogo)
adminRoute.get('/image/slider', ImageAdminController.imageSlider)

export default adminRoute;