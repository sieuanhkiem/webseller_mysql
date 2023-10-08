import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';
import DistrictService from '../../services/district.service';

export default class DistrictJsonController {
    private static districtService: DistrictService = new DistrictService();
    public static async GetDistrictByCityCode(req: Request, res: Response) {
        try {
            const cityCode: string | null = req.body.city_code || null;
            if(cityCode == null) throw new Error('city code not found in body not found');
            const districts = await DistrictJsonController.districtService.GetDistrictByCityCode(cityCode);
            return res.json({
                code: 200,
                districts: Common.encrypt(districts)
            });
        } 
        catch (error: unknown) {
            logging.error(`[${DistrictJsonController.name}].[${DistrictJsonController.GetDistrictByCityCode.name}]: ${error}`);
            res.json({
                code: 500,
                error: (error as Error).stack
            });
        }
    }
}