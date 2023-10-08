import BaseService from './base.service';
import { logging } from '../config/logging';
import { SalesOrder } from '../entity/sales_order';
import { Repository } from 'typeorm';
import { SalerOrderStatus } from '../enum/entity';

export default class SaleOrderService extends BaseService {
    public async CreateSaleOrder(saleOrder: SalesOrder): Promise<SalesOrder | false | undefined> {
        try {
            await super.connectDatabase();
            const repositorySaleOrder: Repository<SalesOrder> = super.createRepository(SalesOrder) as Repository<SalesOrder>;
            saleOrder.transaction_number = `SAL_${new Date().formatTime('YYYYMMDDHHmmss')}_${await repositorySaleOrder.count() + 1}`
            const saleOrderNew: SalesOrder = await repositorySaleOrder.save(saleOrder);
            await super.disconnectDatabase();
            return saleOrderNew;
        } 
        catch (error: unknown) {
            logging.error(`[${SaleOrderService.name}].[${this.CreateSaleOrder.name}]: ${error}`);
            await super.Rollback();
            await super.disconnectDatabase();
            return false;
        }
    }

    public async GetSaleOrderByCustomerCode(customerCode: string): Promise<SalesOrder[] | null | undefined> {
        try {
            await super.connectDatabase();
            const repositorySaleOrder : Repository<SalesOrder> = super.createRepository(SalesOrder) as Repository<SalesOrder>;
            const saleOrders: SalesOrder[] = await repositorySaleOrder.createQueryBuilder('sale_order')
            .innerJoin('sale_order.customer', 'customer')
            .where('customer.customer_code = :customerCode and sale_order.status = :status', { customerCode, status: SalerOrderStatus.NHAP })
            .setFindOptions({
                relations: {
                    product: true,
                    inventory: {
                        product_size: true
                    },
                    customer: {
                        address: true
                    }
                }
            })
            .getMany();
            await super.disconnectDatabase();
            return saleOrders;
        } 
        catch (error: unknown) {
            logging.error(`[${SaleOrderService.name}].[${this.GetSaleOrderByCustomerCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async UpdateSaleOrder(saleOrder: SalesOrder): Promise<SalesOrder | boolean> {
        try {
            await super.connectDatabase();
            const repositorySaleOrder: Repository<SalesOrder> = super.createRepository(SalesOrder) as Repository<SalesOrder>;
            const saleOrderUpdate: SalesOrder = await repositorySaleOrder.save(saleOrder);
            await super.disconnectDatabase();
            return saleOrderUpdate;
        } 
        catch (error: unknown) {
            logging.error(`[${SaleOrderService.name}].[${this.UpdateSaleOrder.name}]: ${error}`);
            await super.disconnectDatabase();
            return false
        }
    }

    public async Rollback(): Promise<void> {
        try {
            await super.connectDatabase();
            await super.Rollback();
            await super.disconnectDatabase();
        } 
        catch (error) {
            logging.error(`[${SaleOrderService.name}].[${this.Rollback.name}]: ${error}`);
            await super.disconnectDatabase();
        }
    }
}