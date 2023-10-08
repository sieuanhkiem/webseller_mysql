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
                .addSelect('sale_price.sale_code', 'saleCode')
                .innerJoin('sale_price.product', 'product')
                .where('product.id = :productId and sale_price.is_delete = :delete', { productId: productPagination.id, delete: 0 })
                .groupBy('product.product_code, sale_price.sale_code')
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

    public async GetDetailsProduct(productCode: string): Promise<ProductPaginationModel | undefined | null> {
        try {
            await super.connectDatabase();
            const repositoryProduct: Repository<Product> = this.dataSource?.getRepository<Product>(Product) as Repository<Product>;
            const repositorySalePrice: Repository<SalesPrice> = this.dataSource?.getRepository<SalesPrice>(SalesPrice) as Repository<SalesPrice>;
            let productDetail: ProductPaginationModel = await repositoryProduct.createQueryBuilder('product')
                             .where('product.product_code = :productCode', { productCode })
                             .setFindOptions({
                                relations: {
                                    category_product: true,
                                    images: true,
                                    product_sizes: true,
                                    product_colors: true
                                }
                             })
                             .getOneOrFail();
            

            const salePriceProduct: SalePriceOfProduct[] = await repositorySalePrice.createQueryBuilder('sale_price')
                                                                            .select('Min(sale_price.sale_price)', 'salePrice')
                                                                            .addSelect('product.product_code', 'productCode')
                                                                            .addSelect('sale_price.sale_code', 'saleCode')
                                                                            .addSelect('product_size.size_code', 'sizeCode')
                                                                            .innerJoin('sale_price.product', 'product')
                                                                            .innerJoin('sale_price.product_size', 'product_size')
                                                                            .where('product.product_code = :productCode and sale_price.is_delete = :delete', { productCode, delete: 0 })
                                                                            .groupBy('product.product_code, sale_price.sale_code, product_size.size_code')
                                                                            .execute();

            
            if(salePriceProduct.length > 0) productDetail.price_product = salePriceProduct[0];
            await super.disconnectDatabase();
            return productDetail;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.GetDetailsProduct.name}]: ${error}`);
            super.disconnectDatabase();
            return null;
        }
    }

    public async GetRandomProduct(): Promise<ProductPaginationModel[]> {
        try {
            const repositoryProduct: Repository<Product> = this.dataSource?.getRepository(Product) as Repository<Product>;
            const repositorySalePrice: Repository<SalesPrice> = await this.dataSource?.getRepository(SalesPrice) as Repository<SalesPrice>;
            await super.connectDatabase();
            let productsRand: ProductPaginationModel[] = await repositoryProduct.createQueryBuilder('product')
                                                                                 .orderBy('NEWID()')
                                                                                 .setFindOptions({
                                                                                    relations: {
                                                                                        images: true
                                                                                    }
                                                                                 })
                                                                                 .limit(5)
                                                                                 .getMany();

            
            for (let product of productsRand) {
                const salePrice: SalePriceOfProduct[] = await repositorySalePrice.createQueryBuilder('sale_price')
                                                                                .select('MIN(sale_price.sale_price)', 'salePrice')
                                                                                .addSelect('product.product_code', 'productCode')
                                                                                .addSelect('sale_price.sale_code', 'saleCode')
                                                                                .innerJoin('sale_price.product', 'product')
                                                                                .where('product.id = :productId and sale_price.is_delete = :delete', { productId: product.id, delete: 0 })
                                                                                .groupBy('product.product_code, sale_price.sale_code')
                                                                                .execute();
                if(salePrice.length > 0) product.price_product = salePrice[0];
            }                                                                    
            await super.disconnectDatabase();
            return productsRand;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.GetRandomProduct.name}]: ${error}`);
            return []
        }
    }

    public async FindProductByCode(productCode: string): Promise<Product | null | undefined> {
        try {
            await super.connectDatabase();
            const product: Product = await Product.findOneOrFail({
                where: {
                    product_code: productCode,
                },
                relations: {
                    images: true
                }
            });
            await super.disconnectDatabase();
            return product;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.FindProductByCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }
}