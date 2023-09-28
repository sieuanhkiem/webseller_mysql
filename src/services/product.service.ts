import { Product } from '../entity/product'
import BaseService from './base.service';
import { Repository } from 'typeorm';
import { logging } from '../config/logging';

export default class ProductService extends BaseService {

    public async GetProductByNumberPage(page: number = 1, quantityOfPage: number, categoryCode: string): Promise<ProductPagination<Product>> {
        try {
            const position: number = (page - 1) * quantityOfPage + 1;
            await this.connectDatabase();
            const repositoryProduct: Repository<Product> = await this.dataSource?.getRepository(Product) as Repository<Product>;
            const countData =  await repositoryProduct.count();
            const maxPage = Math.ceil(countData % quantityOfPage);
            const productReuslt: Product[] = await repositoryProduct.createQueryBuilder('product').where('product.product_category = :category', { category: categoryCode }).orderBy('product.create_date', 'DESC').offset(position).take(quantityOfPage).getMany();
            await this.disconnectDatabase();
            return {
                currentPage: page,
                maxPage,
                isContinue: page == maxPage,
                products: productReuslt 
            };
        } catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.GetProductByNumberPage.name}]: ${error}`);
            return {
                currentPage: page,
                maxPage: 0,
                isContinue: false,
                products: [] 
            };
        }
    }
}