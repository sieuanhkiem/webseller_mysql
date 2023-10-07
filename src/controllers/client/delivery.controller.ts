import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import CityService from '../../services/city.service';

export default class DeliveryController {
    private static cityService: CityService = new CityService();
    public static async index(req: Request, res: Response) {
        try {
            const cities = await DeliveryController.cityService.GetAllCity();
            return res.render('./client/delivery.ejs', { cities });
        } 
        catch (error: unknown) {
            logging.error(`[${DeliveryController.name}].[${DeliveryController.index.name}]: ${error}`);
            return res.redirect('/page_error');
        }
    }
}