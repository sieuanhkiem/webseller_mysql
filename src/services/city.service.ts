import BaseService from './base.service';
import { logging } from '../config/logging';
import { City } from '../entity/city';
import { Repository } from 'typeorm';

export default class CityService extends BaseService {
    public async GetAllCity(): Promise<City[] | undefined> {
        try {
            await super.connectDatabase();
            const cities: City[] = await City.find();
            await super.disconnectDatabase();
            return cities;
        } 
        catch (error: unknown) {
            logging.error(`[${CityService.name}].[${this.GetAllCity.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async GetCityByCode(cityCode: string): Promise<City | null | undefined> {
        try {
            await super.connectDatabase();
            const city: City = await City.findOneByOrFail({
                city_code: cityCode
            });
            await super.disconnectDatabase();
            return city;
        } 
        catch (error: unknown) {
            logging.error(`[${CityService.name}].[${this.GetCityByCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }
}