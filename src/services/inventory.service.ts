import BaseService from './base.service';
import { logging } from '../config/logging';
import { Address } from '../entity/address';
import { Inventory } from '../entity/inventory';
import { Repository, SelectQueryBuilder } from 'typeorm';
import AddressService from './address.service';

export default class InventoryService extends BaseService {
    private addressService: AddressService = new AddressService();
    public async GetInventories(productCode: string, sizeCode: string, colorCode: string, addressCode: string): Promise<Inventory[] | null | undefined> {
        try {
            const address = await this.addressService.FindAddressByCode(addressCode);
            await super.connectDatabase();
            const repositoryInventory: Repository<Inventory> = super.createRepository(Inventory) as Repository<Inventory>;
            const selectInventory: SelectQueryBuilder<Inventory> = await repositoryInventory.createQueryBuilder('inventory')
            .innerJoin('inventory.product', 'product')
            .innerJoin('inventory.product_size', 'product_size')
            .innerJoin('inventory.product_color', 'product_color')
            .where('product_size.size_code = :sizeCode and product.product_code = :productCode and product_color.color_code = :colorCode and inventory.quantity > 0', { sizeCode, productCode, colorCode });

            if(address != null) {
               const inventories: Inventory[] = await selectInventory
                                            .innerJoin('inventory.shop', 'shop')
                                            .innerJoin('shop.address', 'address')
                                            .innerJoin('address.city', 'city')
                                            .innerJoin('address.district', 'district')
                                            .where('(district.district_code = :districtCode or city.city_code = :cityCode)', { districtCode: address.district.district_code, cityCode: address.city.city_code })
                                            .andWhere('product_size.size_code = :sizeCode and product.product_code = :productCode and product_color.color_code = :colorCode and inventory.quantity > 0', { sizeCode, productCode, colorCode })
                                            .getMany();
                if(inventories.length > 0) 
                {
                    await super.disconnectDatabase();
                    return inventories;
                } 
                    
            }
            const inventories: Inventory[] = await selectInventory.getMany();
            await super.disconnectDatabase();
            return inventories;
        } 
        catch (error: unknown) {
            logging.error(`[${InventoryService.name}].[${this.GetInventories.name}]: ${error}`);
            await super.disconnectDatabase();
            return [];
        }
    }

    public async UpdateInventory(inventory: Inventory): Promise<Inventory | boolean> {
        try {
            await super.connectDatabase();
            const repositoryInventory: Repository<Inventory> = super.createRepository(Inventory) as Repository<Inventory>;
            const inventoryUpdate: Inventory = await repositoryInventory.save(inventory)
            await super.disconnectDatabase();
            return inventoryUpdate;
        } 
        catch (error: unknown) {
            logging.error(`[${InventoryService.name}].[${this.UpdateInventory.name}]: ${error}`);
            await super.disconnectDatabase();
            return false;
        }
    }

    public async Rollback(): Promise<void> {
        try {
            await super.connectDatabase();
            await super.Rollback();
            await super.disconnectDatabase();
        } 
        catch (error) {
            logging.error(`[${InventoryService.name}].[${this.Rollback.name}]: ${error}`);
            await super.disconnectDatabase();
        }
    }
}