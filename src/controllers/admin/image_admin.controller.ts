import { Request, Response } from 'express';
import { logging } from '../../config/logging';
export default class ImageAdminController {
    public static imageLogo(req: Request, res: Response) {
        try {
            return res.render('./admin/image_logo_edit.ejs');
        } 
        catch (error: unknown) {
            logging.error(`[${ImageAdminController.name}].[${ImageAdminController.imageLogo}]: ${error}`);
            return res.redirect('/page_error');    
        }
    }

    public static async imageSlider(req: Request, res: Response) {
        try {
            return res.render('./admin/image_slider_edit.ejs');
        } 
        catch (error: unknown) {
            logging.error(`[${ImageAdminController.name}].[${ImageAdminController.imageSlider}]: ${error}`);
            return res.redirect('/page_error');   
        }
    }
}