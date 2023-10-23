import { SalesPrice } from '../entity/sales_price'
import BaseService from './base.service';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../config/logging';
import { ProductSize } from '../entity/product_size';
import { Product } from '../entity/product';
import { Common } from '../common/common_extendsion';

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
            // console.log(salePrice);
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
            return salePrice;
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceService.name}].[${this.FindSalePriceByCode.name}]: ${error}`);
            return null;
        }
    }

    public async GetSalePriceByProduct(productCode: string): Promise<SalesPrice[]> {
        try {
            await super.connectDatabase();
            const repositorySalePrice: Repository<SalesPrice> = super.createRepository(SalesPrice) as Repository<SalesPrice>;
            const salePrices: SalesPrice[] = await repositorySalePrice.createQueryBuilder('salePrice')
            .innerJoin('salePrice.product', 'product')
            .where('product.product_code = :productCode', { productCode })
            .setFindOptions({
                relations: {
                    product_size: true,
                    product: true
                }
            })
            .getMany();
            await super.disconnectDatabase();
            return salePrices;
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceService.name}].[${this.GetSalePriceByProduct}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async InsertSalePriceAndSize(sizePriceNew: SizePriceNew): Promise<SalesPrice | null> {
        try {
            await super.connectDatabase();
            const repositorySalePrice: Repository<SalesPrice> = super.createRepository(SalesPrice) as Repository<SalesPrice>;
            const repositoryProductSize: Repository<ProductSize> = super.createRepository(ProductSize) as Repository<ProductSize>;
            const repositoryProduct: Repository<Product> = super.createRepository(Product) as Repository<Product>;

            const product: Product = await repositoryProduct.createQueryBuilder('product')
                                                       .where('product.product_code = :productCode', { productCode: sizePriceNew.product_code })
                                                       .getOneOrFail();
            
            const countSize: number = await repositoryProductSize.count();
            let productSize: ProductSize = new ProductSize();
            productSize.size_name = sizePriceNew.size_name;
            productSize.size_code = `SIZ-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countSize + 1, 6)}`;
            productSize.product = product;
            productSize = await repositoryProductSize.save(productSize);

            const countSale: number = await repositorySalePrice.count();
            let salePrice: SalesPrice = new SalesPrice();
            salePrice.sale_price = sizePriceNew.sale_price;
            salePrice.sale_code = `SAL-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countSale + 1, 6)}`;
            salePrice.product = product;
            salePrice.product_size = productSize;
            salePrice = await repositorySalePrice.save(salePrice);
            await super.disconnectDatabase();
            return salePrice;
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceService.name}].[${this.InsertSalePriceAndSize}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }

    public async DeleteSalePriceProduct(sizePriceDelete: SizePriceDelete): Promise<boolean> {
        try {
            await super.connectDatabase();
            const repositorySalePrice: Repository<SalesPrice> = super.createRepository(SalesPrice) as Repository<SalesPrice>;
            const repositoryProductSize: Repository<ProductSize> = super.createRepository(ProductSize) as Repository<ProductSize>;
            let checkSalePrice = false;
            let checkProductSize = false;

            const deleteSalePrice: DeleteResult = await repositorySalePrice.createQueryBuilder().delete()
                                                                            .where('sale_code= :saleCode', { saleCode: sizePriceDelete.sale_code })
                                                                            .execute();

            
            const deleteProductSize: DeleteResult = await repositoryProductSize.createQueryBuilder().delete()
                                                                        .where('size_code = :sizeCode', { sizeCode: sizePriceDelete.size_code })
                                                                        .execute();
                                                                        
            checkSalePrice = deleteSalePrice.affected != null && deleteSalePrice.affected > 0;
            checkProductSize = deleteProductSize.affected != null && deleteProductSize.affected > 0;
            await super.disconnectDatabase();
            return checkSalePrice && checkProductSize;
        } 
        catch (error: unknown) {
            logging.error(`[${SalePriceService.name}].[${this.DeleteSalePriceProduct.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }
}