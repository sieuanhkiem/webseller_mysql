import { Request, Response } from 'express';
import { Customer } from '../../entity/customer';
import { DataSource, EntityManager } from 'typeorm';
import { initialize } from '../../data-source';

export async function index (req: Request, res: Response) {
    const dataSource: DataSource = await initialize() as DataSource;
    const manager: EntityManager = dataSource.manager;
    const cutomerResult: Customer[] = await manager.getRepository(Customer).createQueryBuilder('customer').getMany();
    console.log(cutomerResult);
    return res.send('hello');
};