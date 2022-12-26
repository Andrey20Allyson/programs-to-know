import { Express } from 'express';
import { Server } from 'http';

export interface IServer {
    getApp(): Express;
    getServer(): Server;
    start(port?: number, hostname?: string): void;
}