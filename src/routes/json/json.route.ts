import express, { Router } from 'express';
import SalePriceJsonController from '../../controllers/json/sale_price_json.controller';
import DistrictJsonController from '../../controllers/json/district_json.controller';
import WardJsonController from '../../controllers/json/ward_json.controller';
import CategoryJsonController from '../../controllers/json/category_json.controller'
const jsonRoute: Router = express.Router();

jsonRoute.post('/sale_price/sale_price_code', SalePriceJsonController.SalePriceBySizeCode);
jsonRoute.post('/district/get_district_by_code', DistrictJsonController.GetDistrictByCityCode);
jsonRoute.post('/ward/get_ward_by_code', WardJsonController.GetWardByDistrictCode);
jsonRoute.post('/category/category-new', CategoryJsonController.InsertCategory);
jsonRoute.post('/category/category-update', CategoryJsonController.UpdateCategory);
jsonRoute.post('/category/category-delete', CategoryJsonController.DeleteCategory);

export default jsonRoute;
