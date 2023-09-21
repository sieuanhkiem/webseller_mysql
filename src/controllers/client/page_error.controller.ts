import { Request, Response } from 'express';

export function page_error(req: Request, res: Response) {
    res.render('./page_error/index.ejs');
}