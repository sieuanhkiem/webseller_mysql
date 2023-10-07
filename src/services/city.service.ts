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
            return [];
        }
    }
}