import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CategoryService from '../../services/category.service';

export default class CategoryAdminController {
    private static categoryService: CategoryService = new CategoryService();
    public static async EditCategory(req: Request, res: Response) {
        try {
            const categoryCode: string | null = req.params.categorycode || null;
            if(categoryCode != null) {
                const categoryFind = await CategoryAdminController.categoryService.GetCategoryByCode(categoryCode);
                if(categoryFind == undefined || categoryFind == null) throw new Error(`Can not find category by ${categoryCode}`);
                return res.render('./admin/category_edit.ejs', { category: categoryFind });
            }
            return res.render('./admin/category_new.ejs');
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryAdminController.name}].[${CategoryAdminController.EditCategory.name}]: ${error}`);
            res.redirect('/page_error');
        }
    }

    public static async ListCategory(req: Request, res: Response) {
        try {
            const categories = await CategoryAdminController.categoryService.GetAllCategory() || [];
            return res.render('./admin/category_list.ejs', { categories });
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryAdminController.name}].[${CategoryAdminController.ListCategory.name}]: ${error}`);
            return res.redirect('/oage_error');
        }
    }
}