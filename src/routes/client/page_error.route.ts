import express, { Router } from 'express';
import { page_error } from '../../controllers/client/page_error.controller';

const page_err: Router = express.Router();

page_err.get('/', page_error);

export default page_err;