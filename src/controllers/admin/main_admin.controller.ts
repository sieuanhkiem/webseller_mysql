import { Request, Response } from 'express';
import { logging } from '../../config/logging';

export default class MainController {
    public static index(req: Request, res: Response) {
        try {
            return res.render('./admin/main.ejs');
        } 
        catch (error: unknown) {
            logging.error(`[${MainController.name}].[${MainController.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}