import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import CategoryService from '../../services/category.service';

export default class CategoryJsonController {
    private static categoryService: CategoryService = new CategoryService();
    public static async InsertCategory(req: Request, res: Response) {
        try {
            const strJsonEncryt = req.body.category_name || '';
            if(strJsonEncryt == '') throw new Error('Request body send is not found category name');
            const category_name = Common.decrypt(strJsonEncryt);
            const categoryNew = await CategoryJsonController.categoryService.InsertCategory(category_name);
            if(categoryNew == false) throw new Error(`Create category faild`);
            return res.json({
                code: 200,
                category: Common.encrypt(categoryNew)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryJsonController.name}].[${CategoryJsonController.InsertCategory.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack || null
            });
        }
    }

    public static async UpdateCategory(req: Request, res: Response) {
        try {
            const requestJsonEncrypt: string | null = req.body.category_update || null;
            if(requestJsonEncrypt == null) throw new Error('Can not found category update when sending');
            const { category_code, category_name } = Common.decrypt(requestJsonEncrypt);
            let categoryFind = await CategoryJsonController.categoryService.GetCategoryByCode(category_code);
            if(categoryFind == null || categoryFind == undefined) throw new Error(`Can not find category by category code ${category_code}`);
            categoryFind.category_name = category_name;
            const rowsAffect = await CategoryJsonController.categoryService.UpdateCategory(categoryFind);
            if(rowsAffect == 0 || rowsAffect == false) throw new Error(`Update category faild`);
            res.json({
                code: 200,
                category: Common.encrypt(categoryFind)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${CategoryJsonController.name}].[${CategoryJsonController.UpdateCategory.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack || null
            });
        }
    }

    public static async DeleteCategory(req: Request, res: Response) {
        try {
            const strJsonEncryt = req.body.category_code || '';
            if(strJsonEncryt == '') throw new Error('Request body send is not found category code');
            const category_code = Common.decrypt(strJsonEncryt);
            const deleteResult = await CategoryJsonController.categoryService.DeleteCategory(category_code);
            if(deleteResult == 0 || deleteResult == false) throw new Error('Delete category faild');
            return res.json({
                code: 200,
                rowDelete: deleteResult
            });
        } catch (error: unknown) {
            logging.error(`[${CategoryJsonController.name}].[${CategoryJsonController.DeleteCategory.name}]: ${error}`);
            return res.json({
                code: 500,
                error: (error as Error).message,
                stack: (error as Error).stack || null
            });
        }
    }
}