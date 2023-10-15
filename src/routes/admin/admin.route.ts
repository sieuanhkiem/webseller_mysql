import express, { Router } from 'express';
import CategoryAdminController from '../../controllers/admin/category_admin.controller';
import MainController from '../../controllers/admin/main_admin.controller';

const adminRoute: Router = express.Router();

adminRoute.get('/', MainController.index);
// category
adminRoute.get('/category/list', CategoryAdminController.ListCategory);
adminRoute.get('/category/new', CategoryAdminController.EditCategory);
adminRoute.get('/category/update/:categorycode', CategoryAdminController.EditCategory);

export default adminRoute;