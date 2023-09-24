import "reflect-metadata"
import { DataSource } from 'typeorm';
import { logging } from './config/logging';
import config from './config/config';

const AppDataSource: DataSource = new DataSource({
    type: 'mssql',
    host: config.sqlserver.host,
    username: config.sqlserver.user,
    password: config.sqlserver.pass,
    database: config.sqlserver.database,
    // migrations: ['./dist/migration/*.js'],
    entities: ['./dist/entity/*.js'],
    migrationsTableName: `migration_table`,
    synchronize: false,
    logging: true,
    extra: {
        encrypt: false,
        // trustedConnection: true
        validateConnection: false,
        trustServerCertificate: true
    }
});

export async function initialize(): Promise<void> {
    let isConnect: boolean = false;
    try 
    {
        if(!AppDataSource.isInitialized) {
            const dataSource: DataSource = await AppDataSource.initialize();
            isConnect = dataSource.isInitialized;
            await dataSource.synchronize();
            if(isConnect) await dataSource.destroy();
        }
    } 
    catch (error: unknown)
    {
        if(isConnect) await AppDataSource.destroy();
        logging.error(`Set up database faild: ${error}`);
    }
}

export default AppDataSource;
