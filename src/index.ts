import express, { Express, Request, Response } from 'express';
const { logging } = require('./config/logging');
import config from './config/config';
import './common/string_extendsion';
import { initialize } from './data-source';
import mainRoute from './routes/client/main.route';
import categoryRoute from './routes/client/category.route';
import productRoute from './routes/client/product.route';
import page_err from './routes/client/page_error.route';
// import { Common } from './common/common_extendsion';
const mainApp: Express = express();
mainApp.use('*/css', express.static('./public/css'));
mainApp.use('*/images', express.static('./public/images'));
mainApp.set('views', './views');
mainApp.set('view engine', 'ejs');
mainApp.use('', mainRoute);
mainApp.use('/category', categoryRoute);
mainApp.use('/product', productRoute);
mainApp.use('/page_error', page_err);

mainApp.listen(config.server.port, async () => {
    await initialize();
    console.log(`⚡️[server]: Server is running at http://${config.server.hostname}:${config.server.port}}`);
});