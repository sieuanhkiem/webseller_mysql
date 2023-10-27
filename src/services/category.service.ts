import BaseService from './base.service';
import { logging } from '../config/logging';
import { ProductCategory } from '../entity/product_category';
import { DeleteResult, Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { Common } from '../common/common_extendsion';
import { Product } from '../entity/product';
import { CategoryWithProduct } from '../models/category/category_product.model';
import { SalesPrice } from '../entity/sales_price';

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

    public async InsertCategory(categoryName: string): Promise<ProductCategory | boolean> {
        try {
            await super.connectDatabase();
            const categoryRepository: Repository<ProductCategory> = super.createRepository(ProductCategory) as Repository<ProductCategory>;
            const countCategory: number = await categoryRepository.count() + 1;
            let categoryNew: ProductCategory = new ProductCategory();
            categoryNew.category_code = `CATE-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countCategory, 6)}`;
            categoryNew.category_name = categoryName;
            categoryNew = await categoryRepository.save(categoryNew);
            await super.disconnectDatabase();
            return categoryNew;
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryService.name}].[${this.InsertCategory.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async UpdateCategory(categoryUpdate: ProductCategory): Promise<number | boolean> {
        try {
            await super.connectDatabase();
            const categoryRepository: Repository<ProductCategory> = super.createRepository(ProductCategory) as Repository<ProductCategory>;
            const updateResult: UpdateResult = await categoryRepository.createQueryBuilder('category').update()
            .set({ category_name: categoryUpdate.category_name })
            .where('category_code = :categoryCode', { categoryCode: categoryUpdate.category_code })
            .execute();
            await super.disconnectDatabase();
            return updateResult.affected || 0;
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryService.name}].[${this.UpdateCategory.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async DeleteCategory(categoryCode: string): Promise<number | boolean> {
        try {
            await super.connectDatabase();
            const categoryRepository: Repository<ProductCategory> = super.createRepository(ProductCategory) as Repository<ProductCategory>;
            const productRepository: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            await productRepository.createQueryBuilder('product')
            .innerJoin('product.category_product', 'category')
            .update()
            .set({ category_product: null })
            .whereEntity( 
                await productRepository.createQueryBuilder('product')
                .innerJoin('product.category_product', 'category')
                .where('category.category_code = :categoryCode', { categoryCode })
                .getMany()
            )
            .execute();
            const deleteResult: DeleteResult = await categoryRepository.createQueryBuilder('category').delete()
            .where('category_code = :categoryCode', { categoryCode })
            .execute();
            await super.disconnectDatabase();
            return deleteResult.affected || 0;
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryService.name}].[${this.DeleteCategory.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async GetProductWithCategory(): Promise<CategoryWithProduct[]> {
        try {
            const categories: ProductCategory[] = await this.GetAllCategory() || [];
            const categoriesWithProduct: CategoryWithProduct[] = [];
            if(categories.length == 0) return categoriesWithProduct;

            await super.connectDatabase();
            const repositoryProduct: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            for (let category of categories) {
                let products: ProductCount[] = await repositoryProduct.createQueryBuilder('product')
                                .innerJoin('product.category_product', 'category')
                                .innerJoin('product.sales_order', 'sale_order')
                                .select('product.product_code as product_code, product.product_name as product_name')
                                .addSelect('COUNT(*) AS count')
                                .where('category.category_code = :categoryCode', { categoryCode: category.category_code })
                                .groupBy('product.product_code, product.product_name')
                                .addOrderBy('count', 'DESC')
                                .limit(4)
                                .execute();
                
                if(products.length == 0) {
                    products = await repositoryProduct.createQueryBuilder('product')
                                            .innerJoin('product.category_product', 'category')
                                            .select('product.product_code as product_code, product.product_name as product_name')
                                            .where('category.category_code = :categoryCode', { categoryCode: category.category_code })
                                            .limit(4)
                                            .execute();
                }

                const categoryWithProduct: CategoryWithProduct = new CategoryWithProduct();
                categoryWithProduct.category = category;
                categoryWithProduct.products = products;
                categoriesWithProduct.push(categoryWithProduct);

                if(categoriesWithProduct.length == 2) break;
            }
            await super.disconnectDatabase();
            return categoriesWithProduct;
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryService.name}].[${this.GetProductWithCategory.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }
}