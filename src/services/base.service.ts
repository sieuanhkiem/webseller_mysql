import AppDataSource from '../data-source';
import { logging } from '../config/logging';
import { DataSource } from 'typeorm';

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
}