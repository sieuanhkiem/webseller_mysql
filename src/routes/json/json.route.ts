import express, { Router } from 'express';
import SalePriceJsonController from '../../controllers/json/sale_price_json.controller';
import DistrictJsonController from '../../controllers/json/district_json.controller';
import WardJsonController from '../../controllers/json/ward_json.controller';
import CategoryJsonController from '../../controllers/json/category_json.controller'
import ProductJsonController from '../../controllers/json/product_json.controller';
const jsonRoute: Router = express.Router();

jsonRoute.post('/sale_price/sale_price_code', SalePriceJsonController.SalePriceBySizeCode);
jsonRoute.post('/district/get_district_by_code', DistrictJsonController.GetDistrictByCityCode);
jsonRoute.post('/ward/get_ward_by_code', WardJsonController.GetWardByDistrictCode);
jsonRoute.post('/category/category-new', CategoryJsonController.InsertCategory);
jsonRoute.post('/category/category-update', CategoryJsonController.UpdateCategory);
jsonRoute.post('/category/category-delete', CategoryJsonController.DeleteCategory);
jsonRoute.post('/product/product-new', ProductJsonController.InsertProduct);
jsonRoute.post('/product/product-update/delete-img-color', ProductJsonController.DeleteImageAndColorOfProduct);
jsonRoute.post('/product/product-update', ProductJsonController.UpdateProduct);
jsonRoute.post('/product/product-delete', ProductJsonController.DeleteProduct);
jsonRoute.post('/product/insert-size-price', SalePriceJsonController.InsertSalePriceAndSize);
jsonRoute.post('/product/delete-size-price', SalePriceJsonController.DeleteSizeAndPrice);

export default jsonRoute;
