import { Product } from '../entity/product'
import { ProductPaginationModel } from '../models/product/product-pagination.model';
import { SalesPrice } from '../entity/sales_price'
import BaseService from './base.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../config/logging';
import '../common/date_extendsion';
import { Order } from '../enum/order';


export default class ProductService extends BaseService {

    public async GetProductByNumberPage(page: number = 1, quantityOfPage: number, categoryCode: string, order: Order = Order.ASC): Promise<ProductPagination<ProductPaginationModel>> {
        try {
            const position: number = (page - 1) * quantityOfPage;
            await super.connectDatabase();
            const repositoryProduct: Repository<Product> = await this.dataSource?.getRepository(Product) as Repository<Product>;
            const repositorySalePrice: Repository<SalesPrice> = await this.dataSource?.getRepository(SalesPrice) as Repository<SalesPrice>;
            const selectQuery: SelectQueryBuilder<ProductPaginationModel>  = await repositoryProduct.createQueryBuilder('product')
                                                .innerJoin('product.category_product', 'category')
                                                .where('category.category_code = :category', { category: categoryCode });

                                          
            const countData = await selectQuery.getCount();
            const maxPage = Math.floor(countData / quantityOfPage) + 1;
            let productReuslt: ProductPaginationModel[] = await selectQuery
                                                .orderBy('product.create_date', 'DESC')
                                                .offset(position)
                                                .limit(quantityOfPage)
                                                .setFindOptions({
                                                    relations: {
                                                        images: true
                                                    }
                                                })
                                                .getMany();
            for(let productPagination of productReuslt) {
                const salePrice: SalePriceOfProduct[] = await repositorySalePrice.createQueryBuilder('sale_price')
                .select('MIN(sale_price.sale_price)', 'salePrice')
                .addSelect('product.product_code', 'productCode')
                // .addSelect('sale_price.id', 'salePriceId')
                .innerJoin('sale_price.product', 'product')
                .where('product.id = :productId and sale_price.is_delete = :delete', { productId: productPagination.id, delete: 0 })
                .groupBy('product.product_code')
                .execute();
                if(salePrice.length > 0) productPagination.price_product = salePrice[0];
            }

            productReuslt = productReuslt.sort(function (proctOne: ProductPaginationModel, proctTwo: ProductPaginationModel) {
                const priceOne = proctOne.price_product?.salePrice || 0;
                const priceTwo = proctTwo.price_product?.salePrice || 0;
                if(priceOne == 0 || priceTwo == 0) return -1;
                return order == Order.ASC ? priceOne - priceTwo : priceTwo - priceOne;
            });                                                                     
            await super.disconnectDatabase();                                          
            return {
                currentPage: page,
                maxPage,
                totalRecord: countData,
                isContinue: page == maxPage,
                products: productReuslt
            };
        } catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.GetProductByNumberPage.name}]: ${error}`);
            await super.disconnectDatabase();
            return {
                currentPage: page,
                totalRecord: 0,
                maxPage: 0,
                isContinue: false,
                products: [] 
            };
        }
    }
}