import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
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
mainApp.use(bodyParser({
    limit: '50mb',
    extended: true
}));
mainApp.use(express.json());
mainApp.use(express.urlencoded({ extended: true }));
mainApp.use(cookieParser());

AddRouteClient(mainApp);
AddRouteSession(mainApp);
AddRouteJson(mainApp);
AdRoutedAdmin(mainApp);

mainApp.use(function (req: Request, res: Response) {
    res.status(404);
    if(req.accepts('html')) {
        return res.redirect('/page_error');
    }
})

mainApp.listen(config.server.port, async () => {
    await initialize();
    console.log(`⚡️[server]: Server is running at http://${config.server.hostname}:${config.server.port}}`);
});