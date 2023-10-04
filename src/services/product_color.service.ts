import BaseService from './base.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../config/logging';
import { ProductColor } from '../entity/product_color';

export default class ProductColorService extends BaseService {
    public async FindProductColorByCode(colorCode: string): Promise<ProductColor | null | undefined> {
        try {
            await super.connectDatabase();
            const productCode: ProductColor = await ProductColor.findOneOrFail({
                where: {
                    color_code: colorCode
                }
            });
            await super.disconnectDatabase();
            console.log(productCode);
            return productCode;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductColorService.name}].[${this.FindProductColorByCode.name}]: ${error}`);
            return null;
        }
    }
}