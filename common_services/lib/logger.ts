import * as winston from 'winston';

/**
 * Config pentru logguri comun
 */

export type ILogger = winston.Logger;

export class Logger {
    static create(server_name: string) {
        return winston.createLogger({
            level: 'info',
            defaultMeta: {
                service: server_name,
            },
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.ms(),
                winston.format.metadata(),
                winston.format.cli()
            )
        })
    }

}