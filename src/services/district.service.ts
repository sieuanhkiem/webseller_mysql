import BaseService from './base.service';
import { logging } from '../config/logging';
import { District } from '../entity/district';
import { Repository } from 'typeorm';

export default class DistrictService extends BaseService {
    public async GetDistrictByCityCode(cityCode: string): Promise<District[] | undefined> {
        try {
            await super.connectDatabase();
            const districtRepository: Repository<District> = this.dataSource?.getRepository(District) as Repository<District>;
            const districts: District[] = await districtRepository.createQueryBuilder('district')
            .innerJoin('district.city', 'city')
            .where('city.city_code= :cityCode', { cityCode })
            .getMany();
            await super.disconnectDatabase();
            return districts;
        } 
        catch (error: unknown) {
            logging.error(`[${DistrictService.name}].[${this.GetDistrictByCityCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async GetDistrictByCode(districtCode: string): Promise<District | null | undefined> {
        try {
            await super.connectDatabase();
            const districts: District = await District.findOneOrFail({
                where: {
                    district_code: districtCode
                }
            });
            await super.disconnectDatabase();
            return districts;
        } 
        catch (error: unknown) {
            logging.error(`[${DistrictService.name}].[${this.GetDistrictByCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }
}