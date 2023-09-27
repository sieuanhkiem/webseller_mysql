import express, { Router } from 'express';
import CategoryController from '../../controllers/client/category.controller';

const categoryRoute: Router = express.Router();
categoryRoute.get('/:categorycode/:page?', CategoryController.index);
export default categoryRoute;