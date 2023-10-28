import "reflect-metadata"
import { DataSource } from 'typeorm';
import { logging } from './config/logging';
import config from './config/config';
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
import { City } from './entity/city'
import { District } from './entity/district'
import { Ward } from './entity/ward'
// import msnodesqlv8 from 'mssql/msnodesqlv8'

const AppDataSource: DataSource = new DataSource({
    type: 'mysql',
    // driver: msnodesqlv8,
    host: config.sqlserver.host,
    username: config.sqlserver.user,
    password: config.sqlserver.pass,
    database: config.sqlserver.database,
    migrations: ['./dist/migrations/*.js'],
    entities: ['./dist/entity/*.js'],
    migrationsRun: true,
    migrationsTableName: `migration_table`,
    synchronize: false,
    logging: true,
    extra: {
        encrypt: false,
        // trustedConnection: true,
        validateConnection: false,
        trustServerCertificate: true,
    }
});

export async function initialize(): Promise<void> {
    let isConnect: boolean = false;
    try 
    {
        if(!AppDataSource.isInitialized) {
            const dataSource: DataSource = await AppDataSource.initialize();
            isConnect = dataSource.isInitialized;
            // if(refresh) {
            //     await dataSource.manager.query('EXEC sp_msforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL"');
            //     dataSource.entityMetadatas.forEach(ent => {
            //         ent.foreignKeys.reduce(async function (current: Promise<never[]>, foreign: ForeignKeyMetadata) {
            //             await dataSource.manager.query(
            //                 `
            //                 IF (OBJECT_ID('${foreign.name}', 'F') IS NOT NULL)
            //                     BEGIN
            //                         ALTER TABLE ${foreign.entityMetadata.tablePath} DROP CONSTRAINT ${foreign.name}
            //                     END
            //                 `
            //             )
            //             return current
            //         }, Promise.resolve([]))
            //         .then( async function (result) {
            //             await dataSource.manager.query(`
            //                 IF object_id('${ent.tablePath}', 'u') IS NOT NULL
            //                 BEGIN
            //                     DROP TABLE ${ent.tablePath}
            //                 END
            //             `);
            //         });
            //     });
            //     await dataSource.synchronize();
            // }
            await initData(dataSource);
            if(isConnect) await dataSource.destroy();
        }
    } 
    catch (error: unknown)
    {
        if(isConnect) await AppDataSource.destroy();
        logging.error(`Set up database faild: ${error}`);
    }
}

async function initData(dataSource:DataSource): Promise<void> {
    const repositoryCity = dataSource.getRepository(City);
    const repositoryDistrict = dataSource.getRepository(District);
    const repositoryWard = dataSource.getRepository(Ward);

    const countCity = await repositoryCity.count();
    const countDistrict = await repositoryDistrict.count();
    const countWard = await repositoryWard.count();

    if(countCity == 0 && countDistrict == 0 && countWard == 0) {
        await repositoryWard.createQueryBuilder().delete().execute();
        await repositoryDistrict.createQueryBuilder().delete().execute();
        await repositoryCity.createQueryBuilder().delete().execute();
        const city: City = await repositoryCity.create({
            city_code: '700000',
            city_name: 'TP.Hồ Chí Minh'
        }).save();
        
        const data = [
            { 
              '766': 'Quận Bình Tân',
              'ward': [
                {'27436': 'Phường Bình Hưng Hòa'},
                {'27439': 'Phường Bình Hưng Hoà A'},
                {'27442': 'Phường Bình Hưng Hòa B'},
                {'27445': 'Phường Bình Trị Đông'},
                {'27448': 'Phường Bình Trị Đông A'},
                {'27451': 'Phường Bình Trị Đông B'},
                {'27454': 'Phường Tân Tạo'},
                {'27457': 'Phường Tân Tạo A'},
                {'27460': 'Phường An Lạc'},
                {'27463': 'Phường An Lạc A'}
            ]
            }, 
            { 
                '777': 'Quận Tân Bình',
                'ward': [
                    { '26977': 'Phường 01' },
                    { '26965': 'Phường 02' },
                    { '26980': 'Phường 03' },
                    { '26968': 'Phường 04' },
                    { '26989': 'Phường 05' },
                    { '26995': 'Phường 06' },
                    { '26986': 'Phường 07' },
                    { '26998': 'Phường 08' },
                    { '27001': 'Phường 09' },
                    { '26992': 'Phường 10' },
                    { '26983': 'Phường 11' },
                    { '26971': 'Phường 12' },
                    { '26974': 'Phường 13' },
                    { '27004': 'Phường 14' },
                    { '27007': 'Phường 15' }
                ]
            }
        ];
        for (let record of data) {
            const districtCode: string = Object.keys(record)[0];
            const disctrictValue: string = Object.values(record)[0];
            const district: District = new District();
            district.district_code = districtCode;
            district.district_name = disctrictValue;
            district.city = city;
            await repositoryDistrict.save(district);
            
            for (let w of record.ward) {
                const wardCode = Object.keys(w)[0];
                const wardValue = Object.values(w)[0];
                const ward: Ward = new Ward();
                ward.ward_name = wardValue;
                ward.ward_code = wardCode;
                ward.city = city;
                ward.district = district;
                await repositoryWard.save(ward);
            }
            
        };
    }
}

export default AppDataSource;
