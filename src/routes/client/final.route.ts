import express, { Router } from 'express';
import FinalController from '../../controllers/client/final.controller';


const finalRoute: Router = express.Router();
finalRoute.get('/:customercode', FinalController.index);
export default finalRoute;