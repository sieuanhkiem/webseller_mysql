import dotenv from 'dotenv';
dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_POST = process.env.SERVER_POST || '3000';

const SQLSERVER_HOST = process.env.SQLSERVER_HOST || 'localhost';
const SQLSERVER_DATABASE = process.env.SQLSERVER_DATABASE || 'localdb';
const SQLSERVER_USER = process.env.SQLSERVER_USER || 'sa';
const SQLSERVER_PASS = process.env.SQLSERVER_PASS || '';

const config = {
    server: {
        hostname: SERVER_HOST,
        port: SERVER_POST
    },
    sqlserver: {
        host: SQLSERVER_HOST,
        database: SQLSERVER_DATABASE,
        user: SQLSERVER_USER,
        pass: SQLSERVER_PASS
    },
    secrectkey: 'E821752166E916AEEF940855'
};

export default config;