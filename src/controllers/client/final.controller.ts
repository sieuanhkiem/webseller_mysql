import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import SaleOrderService from '../../services/sale_order.service';
import { SalesOrder } from '../../entity/sales_order';
import { SalerOrderStatus } from '../../enum/entity';
import CategoryService from '../../services/category.service';

export default class FinalController {
    private static saleOrderService: SaleOrderService = new SaleOrderService();
    private static categoryService: CategoryService = new CategoryService();
    public static async index(req: Request, res: Response) {
        try {
            const customerCode: string | null = req.params.customercode || null;
            if(customerCode == null) throw new Error('Can not find customer code');
            const saleOrders: SalesOrder[] = await FinalController.saleOrderService.GetSaleOrderByCustomerCode(customerCode) as SalesOrder[];
            for (let saleOrder of saleOrders) {
                saleOrder.status = SalerOrderStatus.CHOVANCHUYEN;
                const updateResult = await FinalController.saleOrderService.UpdateSaleOrder(saleOrder);
                if(updateResult == false) throw new Error('Update saler order faild')
            }
            const totalPrice:number = saleOrders.reduce(function (totalPrice: number, saleOrder: SalesOrder) {
                totalPrice += saleOrder.amount;
                return totalPrice;
            }, 0);
            const category = await FinalController.categoryService.GetAllCategory();
            const categoriesWithProduct = await FinalController.categoryService.GetProductWithCategory();
            res.render('./client/final.ejs', { saleOrders, totalPrice, category, categoriesWithProduct });
        } 
        catch (error: unknown) {
            logging.error(`[${FinalController.name}].[${FinalController.index}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}