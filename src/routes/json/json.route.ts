import express, { Router } from 'express';
import SalePriceJsonController from '../../controllers/json/sale_price_json.controller';
const jsonRoute = express.Router();

jsonRoute.post('/sale_price/sale_price_code', SalePriceJsonController.SalePriceBySizeCode);

export default jsonRoute;
