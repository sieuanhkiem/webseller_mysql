import express, { Router } from 'express';
import CategoryController from '../../controllers/client/category.controller';

const categoryRoute: Router = express.Router();
categoryRoute.get('/:categoryCode', CategoryController.index);

export default categoryRoute;