import express, { Router } from 'express';
import SessionController from '../../controllers/session/session.controller';
const sessionRoute: Router = express.Router();

sessionRoute.get('/get-session-cart', SessionController.getSessionCart);
sessionRoute.post('/push-session-cart', SessionController.pushSessionCart);
sessionRoute.post('/remove-session-cart', SessionController.removeSessionCart);
sessionRoute.post('/update-session-cart', SessionController.updateSessionCart);
sessionRoute.post('/clear-session-cart', SessionController.clearCartSession);

export default sessionRoute;