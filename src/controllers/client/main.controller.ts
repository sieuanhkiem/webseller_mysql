import { Request, Response } from 'express';


// export async function index () {
//     // const dataSource: DataSource = await initialize() as DataSource;
//     // const manager: EntityManager = dataSource.manager;
//     // const cutomerResult: Customer[] = await manager.getRepository(Customer).createQueryBuilder('customer').getMany();
//     // console.log(cutomerResult);
//     // dataSource.destroy();

// };

export default class MainControler {
    public static async index(req: Request, res: Response) {
        return res.render('./client/index.ejs');
    }
}