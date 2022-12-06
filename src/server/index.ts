import express, { Express } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { IServer } from './index.d'
import { ApiRouter } from './api/routes';

export class Server implements IServer {
    private app: Express;
    private server: HTTPServer;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.app.use(express.static('public'));
        this.app.use('/api', ApiRouter());
    }
    
    start(port: number = 3000, hostname: string = 'localhost'): void {
        if (!this.server.listening) {
            this.server.listen(port, hostname, () => {
                console.log(`> Now server is listening http://${ hostname + (port === 80? '': `:${port}` )}/`);
            });
        } else {
            throw new Error('server already started!')
        }
    }

    getApp(): express.Express {
        return this.app;
    }

    getServer(): HTTPServer {
        return this.server;
    }
}