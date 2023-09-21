import express, { Router } from 'express';
import { index } from '../../controllers/client/main.controller';
const mainRoute: Router = express.Router();

mainRoute.get('/', index);

export default mainRoute;

