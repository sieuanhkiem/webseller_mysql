import express, { Router } from 'express';
import SalePriceJsonController from '../../controllers/json/sale_price_json.controller';
import DistrictJsonController from '../../controllers/json/district_json.controller';
import WardJsonController from '../../controllers/json/ward_json.controller';
const jsonRoute = express.Router();

jsonRoute.post('/sale_price/sale_price_code', SalePriceJsonController.SalePriceBySizeCode);
jsonRoute.post('/district/get_district_by_code', DistrictJsonController.GetDistrictByCityCode);
jsonRoute.post('/ward/get_ward_by_code', WardJsonController.GetWardByDistrictCode);

export default jsonRoute;
