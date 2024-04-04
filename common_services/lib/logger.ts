export interface ILogger {
    log(message: any): void;
    error(message: any): void;
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

    log(message: any) {
        console.log(`[${this.server_name}]: ${message}`);
    }

    error(message: any) {
        console.error(`[${this.server_name}]: ${message}`);
    }

}