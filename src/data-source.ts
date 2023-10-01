import "reflect-metadata"
import { DataSource } from 'typeorm';
import { logging } from './config/logging';
import config from './config/config';
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

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

export async function initialize(refresh: boolean = false): Promise<void> {
    let isConnect: boolean = false;
    try 
    {
        if(!AppDataSource.isInitialized) {
            const dataSource: DataSource = await AppDataSource.initialize();
            isConnect = dataSource.isInitialized;
            if(refresh) {
                dataSource.entityMetadatas.forEach(ent => {
                    ent.foreignKeys.reduce(async function (current: Promise<never[]>, foreign: ForeignKeyMetadata) {
                        await dataSource.manager.query(
                            `
                            IF (OBJECT_ID('${foreign.name}', 'F') IS NOT NULL)
                                BEGIN
                                    ALTER TABLE ${foreign.entityMetadata.tablePath} DROP CONSTRAINT ${foreign.name}
                                END
                            `
                        )
                        return current
                    }, Promise.resolve([]))
                    .then( async function (result) {
                        await dataSource.manager.query(`
                            IF object_id('${ent.tablePath}', 'u') IS NOT NULL
                            BEGIN
                                DROP TABLE ${ent.tablePath}
                            END
                        `);
                    });
                });
                await dataSource.synchronize();
            }
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
