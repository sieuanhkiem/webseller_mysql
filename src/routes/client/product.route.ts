import express, { Router } from 'express';
import ProductController from '../../controllers/client/product.controller'

const productRoute: Router = express.Router();

productRoute.get('/:productCode', ProductController.index);

export default productRoute;