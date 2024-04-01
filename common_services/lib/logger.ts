export interface ILogger {
    log(message: string): void;
    error(message: string): void;
}


export class Logger implements ILogger {
    private static instance: Logger | null;
    private readonly server_name: string;

    static create(server_name: string) {
        if(!this.instance) {
            this.instance = new Logger(server_name);
        };
        return this.instance;
    }

    private constructor(server_name: string) {
        this.server_name = server_name;
    }

    log(message: string) {
        console.log(`[${this.server_name}]: ${message}`);
    }

    error(message: string | Error) {
        console.error(`[${this.server_name}]: ${message}`);
    }

}