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

export async function initialize(): Promise<DataSource | undefined> {
    try {
        return await AppDataSource.initialize();
        logging.info('Data Source has been initialized!');
    } catch (error) {
        logging.error(`Error during Data Source initialization: ${error}`);
    }
}

export default AppDataSource;
