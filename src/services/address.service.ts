import BaseService from './base.service';
import { logging } from '../config/logging';
import { Address } from '../entity/address';
import { Repository } from 'typeorm';
import { City } from '../entity/city';
import { District } from '../entity/district';
import { Ward } from '../entity/ward';

export default class AddressService extends BaseService {
    public async CreateAddress(city: City, district: District, ward: Ward, address: string): Promise<Address | undefined | null> {
        try {
            await super.connectDatabase();
            const repositoryAddress: Repository<Address> = super.createRepository(Address) as Repository<Address>;
            let addressNew: Address = new Address();
            addressNew.address_1 = address;
            addressNew.address_code = `ADSS_${new Date().formatTime('YYYYMMDDHHmmss')}_${await Address.count() + 1}`;
            addressNew.city = city;
            addressNew.district = district;
            addressNew.ward = ward;
            addressNew = await repositoryAddress.save(addressNew);
            await super.disconnectDatabase();
            return addressNew;
        } 
        catch (error: unknown) {
            logging.error(`[${AddressService.name}].[${this.CreateAddress.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }

    public async UpdateAddress(address: Address): Promise<Address | boolean> {
        try {
            await super.connectDatabase();
            const repositoryAddress: Repository<Address> = super.createRepository(Address) as Repository<Address>;
            const addressUpdate: Address = await repositoryAddress.save(address)
            await super.disconnectDatabase();
            return addressUpdate;
        } 
        catch (error: unknown) {
            logging.error(`[${AddressService.name}].[${this.UpdateAddress.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;    
        }
    }

    public async FindAddressByCode(addressCode: string): Promise<Address | null> {
        try {
            await super.connectDatabase();
            const address: Address = await Address.findOneOrFail({
                where: {
                    address_code: addressCode
                },
                relations: {
                    city: true,
                    district: true
                }
            });
            await super.disconnectDatabase();
            return address;
        } 
        catch (error: unknown) {
            logging.error(`[${AddressService.name}].[${this.FindAddressByCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }

    public async FindAddress(cityCode: string, districtCode: string, wardCode: string, addressDetail: string): Promise<Address | null> {
        try {
            await super.connectDatabase();
            const address: Address = await Address.findOneOrFail({
                where: {
                    city: {
                        city_code: cityCode
                    },
                    district: {
                        district_code: districtCode
                    },
                    ward: {
                        ward_code: wardCode
                    },
                    address_1: addressDetail
                }
            });
            super.disconnectDatabase();
            return address;
        } catch (error: unknown) {
            logging.error(`[${AddressService.name}].[${this.FindAddress.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }
}