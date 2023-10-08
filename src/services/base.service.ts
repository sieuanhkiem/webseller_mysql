import AppDataSource from '../data-source';
import { logging } from '../config/logging';
import { BaseEntity, DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export default class BaseService {
    dataSource: DataSource | undefined = undefined;

    protected async connectDatabase(): Promise<void> {
        try {
            if(this.dataSource == undefined || !AppDataSource.isInitialized) {
                this.dataSource = await AppDataSource.initialize();
                logging.info('connect database success');
            }
            // else {
            //     this.dataSource?.initialize();
            // }
        } catch (error: unknown) {
            logging.error(`connect to database faild: ${error}`);
        }
    }

    protected async disconnectDatabase(): Promise<void> {
        try {
            if(this.dataSource != undefined && this.dataSource.isInitialized) {
                await this.dataSource.destroy();
                logging.info('disconnect database success');
            }
        } catch (error: unknown) {
            logging.error(`disconnect to database faild: ${error}`);
        }
    }

    protected createRepository<T extends BaseEntity>(model: EntityTarget<T>): Repository<T> | undefined {
        try {
            if(this.dataSource != undefined && this.dataSource.isInitialized) return this.dataSource.getRepository(model) as Repository<T>;
            throw new Error('database is not connect');
        } 
        catch (error: unknown) {
            logging.error(`Get repository faild: ${error}`);
        }
    }

    protected async Rollback(): Promise<void> {
        try {
            if(this.dataSource != undefined && this.dataSource.isInitialized) 
            {
                const query = this.dataSource.createQueryRunner();
                await query.startTransaction();
                await query.rollbackTransaction();
            } 
            throw new Error('database is not connect');
        } 
        catch (error: unknown) {
            logging.error(`Get repository faild: ${error}`);
        }
    }
}