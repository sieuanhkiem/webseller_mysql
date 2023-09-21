import winston from 'winston';

export const logging = winston.createLogger({
    //format của log được thông qua format combine
    format: winston.format.combine(
        winston.format.splat(),
        // định dạng time cho log
        winston.format.timestamp(
        {
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        //thêm màu sắc
        winston.format.colorize(),
        winston.format.printf(log => {
            if(log.stack) return `[${log.timestamp}] [${log.level}] [${log.stack}]`;
            return `[${log.timestamp}] [${log.level}] [${log.message}]`;
        })
    ),
    transports: [
        // hiển thị log qua console
        new winston.transports.Console()
    ]
});