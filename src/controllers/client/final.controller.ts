import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import SaleOrderService from '../../services/sale_order.service';
import { SalesOrder } from '../../entity/sales_order';
import { SalerOrderStatus } from '../../enum/entity';

export default class FinalController {
    private static saleOrderService: SaleOrderService = new SaleOrderService();
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
            res.render('./client/final.ejs', { saleOrders, totalPrice });
        } 
        catch (error: unknown) {
            logging.error(`[${FinalController.name}].[${FinalController.index}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}