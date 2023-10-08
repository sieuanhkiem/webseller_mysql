import BaseService from './base.service';
import { logging } from '../config/logging';
import { Common } from '../common/common_extendsion';
import { Customer } from '../entity/customer';
import CityService from '../services/city.service';
import DistrictService from '../services/district.service';
import WardService from '../services/ward.service';
import AddressService from '../services/address.service';
import { Repository } from 'typeorm';
import { City } from '../entity/city';
import { District } from '../entity/district';
import { Ward } from '../entity/ward';
import { Address } from '../entity/address';

export default class CustomerService extends BaseService {

    public async GetCustomerByCode(customerCode: string): Promise<Customer | null | undefined> {
        try {
            await super.connectDatabase();
            const customer: Customer = await Customer.findOneOrFail({
                where: {
                    customer_code: customerCode,
                },
                relations: {
                    address: true
                }
            });
            await super.disconnectDatabase();
            console.log(customer);
            return customer;
        } 
        catch (error: unknown) {
            logging.error(`[${CustomerService.name}].[${this.GetCustomerByCode.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }

    public async createCustomer(postDelivery: PostDelivery): Promise<Customer | null | undefined> {
        try {
            const cityService: CityService = new CityService();
            const city: City | null = await cityService.GetCityByCode(postDelivery.city) || null;
            const districtService: DistrictService = new DistrictService();
            const district: District | null = await districtService.GetDistrictByCode(postDelivery.district) || null;
            const wardService: WardService = new WardService();
            const ward: Ward | null = await wardService.GetWardByCode(postDelivery.ward) || null;
            const addressService: AddressService = new AddressService();
            const address: Address | null = await addressService.CreateAddress(city!, district!, ward!, postDelivery.address) || null;

            await super.connectDatabase();
            const repositoryCustomer: Repository<Customer> = super.createRepository(Customer) as Repository<Customer>;
            let customerSave: Customer = new Customer();
            customerSave.telephone1 = postDelivery.telephone;
            customerSave.customer_code = postDelivery.code;
            customerSave.customer_name = postDelivery.fullname;
            customerSave.sex = Common.booleanify(postDelivery.sex);
            customerSave.address = address!;
            customerSave.age = new Date().getFullYear() - new Date(postDelivery.birthdate).getFullYear();
            await repositoryCustomer.save(customerSave);
            await super.disconnectDatabase();
            console.log(customerSave);
            return customerSave;
        } 
        catch (error: unknown) {
            logging.error(`[${CustomerService.name}].[${this.createCustomer.name}]: ${error}`);
            await super.disconnectDatabase();
            return null;
        }
    }
}