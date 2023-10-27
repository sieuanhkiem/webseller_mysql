import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CategoryService from '../../services/category.service';


// export async function index () {
//     // const dataSource: DataSource = await initialize() as DataSource;
//     // const manager: EntityManager = dataSource.manager;
//     // const cutomerResult: Customer[] = await manager.getRepository(Customer).createQueryBuilder('customer').getMany();
//     // console.log(cutomerResult);
//     // dataSource.destroy();

// };

export default class MainControler {
    private static categoryService: CategoryService = new CategoryService();
    public static async index(req: Request, res: Response) {
        try {
            const category = await MainControler.categoryService.GetAllCategory();
            const categoriesWithProduct = await MainControler.categoryService.GetProductWithCategory();
            return res.render('./client/index.ejs', { category, categoriesWithProduct });
        } 
        catch (error: unknown) {
            logging.error(`[${MainControler.name}].[${MainControler.index.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}