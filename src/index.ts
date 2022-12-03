import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { readFile } from 'fs/promises';

const app = express();
const server = createServer(app);

function onGetData(req: Request, res: Response, next: NextFunction) {
    const { type } = req.query;

    if (type === 'json') {
        readFile('./data/tecnologies.json', { encoding: 'utf-8' })
        .then(value => {
            res.json(JSON.parse(value));
        });
    }
}

function onServerListen() {
    console.log('> Now server is listening https://localhost/');
}

app.use(express.static('public'));
app.get('/data', onGetData);

server.listen(3000, 'localhost', onServerListen);