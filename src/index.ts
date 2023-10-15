import express, { Express, Request, Response } from 'express';
const { logging } = require('./config/logging');
import config from './config/config';
import './common/string_extendsion';
import { initialize } from './data-source';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { AddRouteClient, AddRouteJson, AddRouteSession, AdRoutedAdmin } from './routes/index.route';

// import { Common } from './common/common_extendsion';
const mainApp: Express = express();
mainApp.use('*/css', express.static('./public/css'));
mainApp.use('*/js', express.static('./public/javascript'));
mainApp.use('*/images', express.static('./public/images'));
mainApp.set('views', './views');
mainApp.set('view engine', 'ejs');

declare module "express-session" {
    interface SessionData {
      cart?: Cart;
    }
}
mainApp.use(session({
    secret: config.secrectkey,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 1 ,
        sameSite: 'lax'
    },
    resave: false
}));
mainApp.use(express.json());
mainApp.use(express.urlencoded({ extended: true }));
mainApp.use(cookieParser());

AddRouteClient(mainApp);
AddRouteSession(mainApp);
AddRouteJson(mainApp);
AdRoutedAdmin(mainApp);

mainApp.listen(config.server.port, async () => {
    await initialize(false);
    console.log(`⚡️[server]: Server is running at http://${config.server.hostname}:${config.server.port}}`);
});