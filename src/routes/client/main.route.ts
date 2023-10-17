import express, { Router, Request, Response, NextFunction } from 'express';
import MainController from '../../controllers/client/main.controller';
const mainRoute: Router = express.Router();

mainRoute.get('/', MainController.index);

export default mainRoute;

