import express, { Express, RequestHandler } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { createAPI } from './routes/api';
import http from 'http';
import fs from 'fs/promises';

export interface IServer {
  getApp(): Express;
  getServer(): http.Server;
  start(port?: number, hostname?: string): void;
}

export function singlePageAppFallback(): RequestHandler {
  const INDEX_PAGE_PATH = './public/index.html';
  let indexPage = fs.readFile(INDEX_PAGE_PATH);
  let indexPageLastChange = fs.stat(INDEX_PAGE_PATH).then(s => s.mtimeMs)

  return async (_, res) => {
    const pastChange = await indexPageLastChange;
    const lastChange = fs.stat(INDEX_PAGE_PATH).then(s => s.mtimeMs);

    if (pastChange < await lastChange) {
      indexPage = fs.readFile(INDEX_PAGE_PATH);
      indexPageLastChange = fs.stat(INDEX_PAGE_PATH).then(s => s.mtimeMs);
    }

    return res.status(200)
      .header('Content-Type', 'text/html')
      .send(await indexPage);
  };
}

export class Server implements IServer {
  private app: Express;
  private server: HTTPServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    this.app.use(express.static('public'));
    this.app.use('/api', createAPI());

    this.app.use(singlePageAppFallback());
  }

  start(port: number = 3000, hostname: string = 'localhost'): void {
    if (this.server.listening) throw new Error('server already started!');

    this.server.listen(port, hostname, () => {
      console.log(`> Now server is listening http://${hostname + (port === 80 ? '' : `:${port}`)}/`);
    });
  }

  getApp(): express.Express {
    return this.app;
  }

  getServer(): HTTPServer {
    return this.server;
  }
}