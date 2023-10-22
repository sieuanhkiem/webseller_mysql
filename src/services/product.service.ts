import { Product } from '../entity/product'
import { ProductPaginationModel } from '../models/product/product-pagination.model';
import { SalesPrice } from '../entity/sales_price'
import BaseService from './base.service';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { logging } from '../config/logging';
import '../common/date_extendsion';
import { Order } from '../enum/order';
import { ProductCategory } from '../entity/product_category';
import { Image } from '../entity/image';
import { ProductColor } from '../entity/product_color';
import { Common } from '../common/common_extendsion';
import { ImageProduct } from '../entity/image_product';
import { ImageType } from '../enum/entity';


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
                                                        images_product: {
                                                            images: true
                                                        }
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
                if(priceOne == 0 || priceTwo == 0) return 1;
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
                                    images_product: {
                                        images: true
                                    },
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
                                                                                        images_product: {
                                                                                            images: true
                                                                                        }
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
                    images_product: {
                        images: true
                    },
                    product_sizes: true,
                    product_colors: true,
                    category_product: true
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

    public async InsertProduct(productInsert: ProductNew): Promise<Product | boolean> {
        try {
            await super.connectDatabase();
            const productRepository: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            const categoryRepository: Repository<ProductCategory> = super.createRepository(ProductCategory) as Repository<ProductCategory>;
            const imageRepository: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const colorRepository: Repository<ProductColor> = super.createRepository(ProductColor) as Repository<ProductColor>;
            const imageProductRepository: Repository<ImageProduct> = super.createRepository(ImageProduct) as Repository<ImageProduct>;

            const category: ProductCategory = await categoryRepository.createQueryBuilder('category').where('category_code= :categoryCode', { categoryCode: productInsert.category_code }).getOneOrFail();
            const colors: ProductColor[] = [];
            // const images: ImageProduct[] = [];
            if(productInsert.colors.length > 0) {
                for(let color of productInsert.colors) {
                    const colorFind: ProductColor | null = await colorRepository.findOne({
                        where: {
                            color_code: color.color_code
                        }
                    });
                    if(colorFind == null) {
                        const colorNew = new ProductColor();
                        colorNew.color_code = color.color_code;
                        colorNew.color_name = color.color_name;
                        colors.push(await colorRepository.save(colorNew));
                    }
                    else colors.push(colorFind);
                }
            }

            const conutProduct: number =  await productRepository.count();
            let productNew: Product = new Product();
            productNew.product_name = productInsert.product_name;
            productNew.product_code = `PROD-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(conutProduct + 1, 6)}`;
            productNew.brand = productInsert.brand;
            productNew.comment = productInsert.comment;
            productNew.preserve = productInsert.preserve;
            productNew.category_product = category;
            productNew.product_colors = colors;
            productNew = await productRepository.save(productNew);

            if(productInsert.images.length > 0) {
                for(let image of productInsert.images) {
                    const countImage: number = await imageRepository.count();
                    const imageNew: Image = new Image();
                    imageNew.image_code = `IMG-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countImage + 1, 6)}`;
                    imageNew.image_name = image.image_name;
                    imageNew.image_type = ImageType.PRODUCTTYPE;
                    if(image.image_default != undefined || image.image_default != null) imageNew.image_default = image.image_default;
                    imageNew.image = Buffer.from(image.buffer, 'base64');
                    const imageProduct: ImageProduct = new ImageProduct();
                    imageProduct.images = await imageRepository.save(imageNew);
                    imageProduct.product = productNew;
                    await imageProductRepository.save(imageProduct);
                }
            }

            await super.disconnectDatabase();
            return productNew;
        } 
        catch (error) {
            logging.error(`[${ProductService.name}].[${this.InsertProduct.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async DeleteImageAndColorProduct(productUpdate: ProductUpdate): Promise<number | boolean> {
        try {
            const product: Product | null | undefined = await this.FindProductByCode(productUpdate.product_code);
            if(product == null || product == undefined) throw new Error(`Can not found product by ${productUpdate.product_code}`);
            await super.connectDatabase();
            const productRepository: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            const imageRepository: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const imageProductRepository: Repository<ImageProduct> = super.createRepository(ImageProduct) as Repository<ImageProduct>;
            const colorRepository: Repository<ProductColor> = super.createRepository(ProductColor) as Repository<ProductColor>;
            let imageCheck: boolean = true;
            let colorCheck: boolean = true;
            if(productUpdate.images.length > 0) {
                for (let imageUpdate of productUpdate.images) {
                    const image: Image = await imageRepository.createQueryBuilder('image')
                                        .where('image.image_code = :imageCode', { imageCode: imageUpdate.image_code! })
                                        .getOneOrFail();
                    
                                     
                    const imageProduct: ImageProduct = await imageProductRepository.createQueryBuilder('imageProduct')
                                                        .innerJoin('imageProduct.product', 'product')
                                                        .innerJoin('imageProduct.images', 'image')
                                                        .where('product.product_code = :productCode and image.image_code = :imageCode', { productCode: product.product_code, imageCode: image.image_code })
                                                        .getOneOrFail();

                    const deleteImageProductReult: DeleteResult = await imageProductRepository.createQueryBuilder().delete()
                                                                    .where('id = :id', { id: imageProduct.id })
                                                                    .execute();
                    
                    if(deleteImageProductReult.affected && deleteImageProductReult.affected > 0) {
                        const deleteImageResult = await imageRepository.createQueryBuilder('image').delete()
                                                                        .where('image.image_code = :imageCode', { imageCode: image.image_code })
                                                                        .execute();
                        imageCheck = deleteImageResult.affected != null && deleteImageResult.affected > 0;
                    }
                }
            }

            if(productUpdate.colors.length > 0) {
                let productColor: ProductColor[] = product.product_colors;
                for(let colorUpdate of productUpdate.colors) {
                    const color: ProductColor = await colorRepository.createQueryBuilder('color')
                                                               .where('color.color_code = :colorCode', { colorCode: colorUpdate.color_code })
                                                               .getOneOrFail();
                    const indexColor = productColor.findIndex(colr => colr.color_code == color.color_code);
                    if(indexColor > -1) productColor.splice(indexColor, 1);                                      
                }
                product.product_colors = productColor;
                let productAfterUpdate: Product = await productRepository.save(product);
                colorCheck = productAfterUpdate.product_colors.length == productColor.length;
            }
            await super.disconnectDatabase();
            return colorCheck && imageCheck;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.DeleteImageAndColorProduct.name}}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async UpdateProduct(productUpdate: ProductNew): Promise<Product | null> {
        try {
            const product: Product | null | undefined = await this.FindProductByCode(productUpdate.product_code!);
            if(product == null || product == undefined) throw new Error(`Can not found product by code ${productUpdate.product_code}`);
            await super.connectDatabase();
            const productRepository: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            const categoryRepository: Repository<ProductCategory> = super.createRepository(ProductCategory) as Repository<ProductCategory>;
            const imageRepository: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const colorRepository: Repository<ProductColor> = super.createRepository(ProductColor) as Repository<ProductColor>;
            const imageProductRepository: Repository<ImageProduct> = super.createRepository(ImageProduct) as Repository<ImageProduct>;
            const category: ProductCategory = await categoryRepository.createQueryBuilder('category').where('category_code= :categoryCode', { categoryCode: productUpdate.category_code }).getOneOrFail();
            const colors: ProductColor[] = [];

            if(productUpdate.colors.length > 0) {
                for(let color of productUpdate.colors) {
                    const colorFind: ProductColor | null = await colorRepository.findOne({
                        where: {
                            color_code: color.color_code
                        }
                    });
                    if(colorFind == null) {
                        const colorNew = new ProductColor();
                        colorNew.color_code = color.color_code;
                        colorNew.color_name = color.color_name;
                        colors.push(await colorRepository.save(colorNew));
                    }
                    else colors.push(colorFind);
                }
            }

            product.product_name = productUpdate.product_name;
            product.brand = productUpdate.brand;
            product.comment = productUpdate.comment;
            product.preserve = productUpdate.preserve;
            product.category_product = category;
            product.product_colors.push(...colors);
            const productAfterUpdate: Product = await productRepository.save(product);

            if(productUpdate.images.length > 0) {
                for(let image of productUpdate.images) {
                    const countImage: number = await imageRepository.count();
                    const imageNew: Image = new Image();
                    imageNew.image_code = `IMG-${new Date().formatTime('YYYYMMDDHHmmss')}-${Common.paddWithLeadingZeros(countImage + 1, 6)}`;
                    imageNew.image_name = image.image_name;
                    imageNew.image_type = ImageType.PRODUCTTYPE;
                    if(image.image_default != undefined || image.image_default != null) imageNew.image_default = image.image_default;
                    imageNew.image = Buffer.from(image.buffer, 'base64');
                    const imageProduct: ImageProduct = new ImageProduct();
                    imageProduct.images = await imageRepository.save(imageNew);
                    imageProduct.product = productAfterUpdate;
                    await imageProductRepository.save(imageProduct);
                }
            }

            await super.disconnectDatabase();
            return productAfterUpdate;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.UpdateProduct.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }

    public async GetAllProduct(): Promise<Product[]> {
        try {
            await super.connectDatabase();
            const productRepository: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            const products: Product[] = await productRepository.createQueryBuilder('product').setFindOptions({
                relations: {
                    category_product: true,
                    product_colors: true,
                    images_product: true,
                    product_sizes: true
                }
            }).getMany();
            await super.disconnectDatabase();
            return products;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.GetAllProduct.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async DeleteProduct(productCode: string): Promise<boolean> {
        try {
            const productDel: Product | null | undefined =  await this.FindProductByCode(productCode);
            if(productDel == null || productDel == undefined) throw new Error(`Can not found product by code ${productCode}`);
            await super.connectDatabase();
            const imageProductRepository: Repository<ImageProduct> = super.createRepository(ImageProduct) as Repository<ImageProduct>;
            const imageRepository: Repository<Image> = super.createRepository(Image) as Repository<Image>;
            const productRepository: Repository<Product> = super.createRepository(Product) as Repository<Product>;
            if(productDel.images_product.length > 0) {
                for(let imageProduct of productDel.images_product) {
                    const deleteImageProduct: DeleteResult = await imageProductRepository.createQueryBuilder()
                                                                                        .delete()
                                                                                        .where('id= :id', { id: imageProduct.id})
                                                                                        .execute();
                    if(deleteImageProduct.affected != null && deleteImageProduct.affected > 0) {
                        await imageRepository.createQueryBuilder()
                                            .delete()
                                            .where('id= :id', { id: imageProduct.images.id })
                                            .execute();
                        
                    }
                }
            }

            const deleteProduct: DeleteResult = await productRepository.createQueryBuilder()
                                                      .delete()
                                                      .where('product_code = :productCode', { productCode: productDel.product_code })
                                                      .execute();
            await super.disconnectDatabase();
            return deleteProduct.affected != null && deleteProduct.affected != undefined && deleteProduct.affected > 0;
        } 
        catch (error: unknown) {
            logging.error(`[${ProductService.name}].[${this.DeleteProduct.name}]: ${error}`);
            await super.disconnectDatabase();
            return false
        }
    }
}