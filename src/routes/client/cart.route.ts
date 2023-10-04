import express, { Router } from 'express';
import CartController from '../../controllers/client/cart.controller';

const cartRoute: Router = express.Router();

cartRoute.get('/showcart', CartController.ShowCart);

export default cartRoute;