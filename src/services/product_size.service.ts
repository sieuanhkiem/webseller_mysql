import BaseService from './base.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../config/logging';
import { ProductSize } from '../entity/product_size';

export default class ProductSizeService extends BaseService {
    public async FindProductSizeByCode(sizeCode: string): Promise<ProductSize | null | undefined> {
        try {
            await super.connectDatabase();
            const productSizeCode: ProductSize = await ProductSize.findOneOrFail({
                where: {
                    size_code: sizeCode
                }
            });
            await super.disconnectDatabase();
            // console.log(productSizeCode);
            return productSizeCode;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductSizeService.name}].[${this.FindProductSizeByCode.name}]: ${error}`);
            return null;
        }
    }
}