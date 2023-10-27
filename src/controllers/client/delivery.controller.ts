import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CityService from '../../services/city.service';
import CustomerService from '../../services/customer.service';
import AdressService from '../../services/address.service';
import { Address } from '../../entity/address';
import { SalesOrder } from '../../entity/sales_order';
import InventoryService from '../../services/inventory.service';
import { Inventory } from '../../entity/inventory';
import ProductService from '../../services/product.service';
import SaleOrderService from '../../services/sale_order.service';
import CategoryService from '../../services/category.service';
import { ProductSize } from '../../entity/product_size';

export default class DeliveryController {
    private static cityService: CityService = new CityService();
    private static customerService: CustomerService = new CustomerService();
    private static addressService: AdressService = new AdressService();
    private static inventoryService: InventoryService = new InventoryService();
    private static productService: ProductService = new ProductService();
    private static saleOrderService: SaleOrderService = new SaleOrderService();
    private static categoryService: CategoryService = new CategoryService();
    public static async index(req: Request, res: Response) {
        try {
            const cities = await DeliveryController.cityService.GetAllCity();
            const cart: Cart = req.session.cart!;
            const category = await DeliveryController.categoryService.GetAllCategory();
            const categoriesWithProduct = await DeliveryController.categoryService.GetProductWithCategory();
            return res.render('./client/delivery.ejs', { cities, cart, category, categoriesWithProduct });
        } 
        catch (error: unknown) {
            logging.error(`[${DeliveryController.name}].[${DeliveryController.index.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }

    public static async postDelivery(req: Request, res: Response) {
        try {
            const cart: Cart = req.session.cart!;
            const postDelivery: PostDelivery = req.body;
            if(postDelivery == null) throw new Error('Post delivery not found in body');
            let customer = await DeliveryController.customerService.GetCustomerByCode(postDelivery.code);
            if(customer == null) {
                customer = await DeliveryController.customerService.createCustomer(postDelivery);
            }
            else {
                const addressUpdate = customer.address;
                addressUpdate.address_1 = postDelivery.address;
                const result = await DeliveryController.addressService.UpdateAddress(addressUpdate);
                if(result != false) customer.address = result as Address;
            }

            for (let cartItem of cart.cartItem) {
                const product = await DeliveryController.productService.FindProductByCode(cartItem.productCode);
                const sizeProduct: ProductSize = product?.product_sizes.filter((size: ProductSize) => size.size_code == cartItem.sizeCode)[0] as ProductSize;
                const saleOrder: SalesOrder = new SalesOrder();
                saleOrder.quantity = cartItem.quantity;
                saleOrder.amount = cartItem.price!;
                saleOrder.customer = customer!;
                saleOrder.product = product!
                saleOrder.product_size = sizeProduct;
                const resultCreate = await DeliveryController.saleOrderService.CreateSaleOrder(saleOrder);
                if(resultCreate == false) throw new Error(`Create sale order faild ${product?.product_name}-${product?.product_code}_${sizeProduct.size_code}-${sizeProduct.size_name}`);
            }

            req.session.destroy((err) => logging.error(err));
            return res.redirect(`/final/${customer!.customer_code}`);
        } 
        catch (error: unknown) {
            logging.error(`[${DeliveryController.name}].[${DeliveryController.postDelivery.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}