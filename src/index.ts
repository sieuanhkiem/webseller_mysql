import express, { Express, Request, Response } from 'express';
const { logging } = require('./config/logging');
import config from './config/config';
import './common/string_extendsion';
import { initialize } from './data-source';
import mainRoute from './routes/client/main.route';
import page_err from './routes/client/page_error.route';
import { DataSource } from 'typeorm';
import { Common } from './common/common_extendsion';
const mainApp: Express = express();
mainApp.use('*/css', express.static('./public/css'));
mainApp.set('views', './views');
mainApp.set('view engine', 'ejs');
mainApp.use('', mainRoute);
mainApp.use('/page_error', page_err);

mainApp.listen(config.server.port, async () => {
    console.log(`⚡️[server]: Server is running at http://${config.server.hostname}:${config.server.port}}`);
    // try 
    // {
    //     const dataSource: DataSource = await initialize() as DataSource;
    //     if(Common.CheckVariableNotNull(dataSource)){
    //         await dataSource?.runMigrations();
    //         if(dataSource.isInitialized) await dataSource.close();
    //     }
    // } 
    // catch  
    // {
    //     mainApp.response.redirect('/page_error');
    // }
});