import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import WardService from '../../services/ward.service';

export default class WardJsonController {
    private static wardService: WardService = new WardService();

    public static async GetWardByDistrictCode(req: Request, res: Response) {
        try {
            const districtCode: string | null = req.body.district_code || null;
            const cityCode: string | null = req.body.city_code || null;
            if(districtCode == null) throw new Error('can not find district code in body');
            if(cityCode == null) throw new Error('can not find city code in body');
            const wards = await WardJsonController.wardService.GetWardByDistrictCodeAndCityCode(districtCode, cityCode);
            return res.json({
                code: 200,
                wards: Common.encrypt(wards)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${WardJsonController.name}].[${WardJsonController.GetWardByDistrictCode.name}]: ${error}`);
            res.json({
                code: 500,
                error: (error as Error).stack
            });
        }
    }
}
