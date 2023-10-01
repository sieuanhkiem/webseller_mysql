import BaseService from './base.service';
import { logging } from '../config/logging';
import { ProductCategory } from '../entity/product_category';
import { Repository } from 'typeorm';

export default class CategoryService extends BaseService {

    public async GetCategoryByCode(code: string) : Promise<ProductCategory | undefined | null> {
        try {
            await super.connectDatabase();
            const repositoryCategory: Repository<ProductCategory> = this.dataSource?.getRepository(ProductCategory) as Repository<ProductCategory>;
            const categoryProduct = await repositoryCategory.createQueryBuilder('category')
                                                            .where('category.category_code = :category_code', { category_code: code }).getOne();
            await super.disconnectDatabase();
            return categoryProduct;
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryService.name}].[${this.GetCategoryByCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return;
        }
    }

    public async GetAllCategory() : Promise<ProductCategory[] | undefined> {
        try {
            await super.connectDatabase();
            const productCategory: ProductCategory[] = await ProductCategory.find();
            await super.disconnectDatabase();
            return productCategory;
        } catch (error: unknown) {
            logging.error(`[${CategoryService.name}].[${this.GetAllCategory.name}]: ${error}`);
            await super.disconnectDatabase();
            return;
        }
    }
}