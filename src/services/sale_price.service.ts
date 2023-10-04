import { SalesPrice } from '../entity/sales_price'
import BaseService from './base.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../config/logging';

export default class SalePriceService extends BaseService {
    public async GetSalePriceBySizeCode(productCode: string, sizeCode: string): Promise<SalesPrice | null | undefined> {
        try {
            await super.connectDatabase();
            const repositorySalePrice: Repository<SalesPrice> = this.dataSource?.getRepository(SalesPrice) as Repository<SalesPrice>;
            const salePrice: SalesPrice = await repositorySalePrice.createQueryBuilder('sale_price')
                                                                    .innerJoin('sale_price.product_size', 'product_size')
                                                                    .innerJoin('sale_price.product', 'product')
                                                                    .where('product_size.size_code = :sizeCode and product.product_code = :productCode', { sizeCode, productCode })
                                                                    .setFindOptions({
                                                                        relations: {
                                                                            product_size: true
                                                                        }
                                                                    })
                                                                    .getOneOrFail()
            console.log(salePrice);
            await super.disconnectDatabase();
            return salePrice;
        } 
        catch (error : unknown) {
            logging.error(`[${SalePriceService.name}].[${this.GetSalePriceBySizeCode.name}]: ${error}`);
            return null;
        }
    }

    public async FindSalePriceByCode(salePriceCode: string): Promise<SalesPrice | null | undefined> {
        try {
            await super.connectDatabase();
            const salePrice: SalesPrice = await SalesPrice.findOneOrFail({
                where: {
                    sale_code: salePriceCode
                }
            });
            await super.disconnectDatabase();
            console.log(salePrice);
            return salePrice;
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceService.name}].[${this.FindSalePriceByCode.name}]: ${error}`);
            return null;
        }
    }
}