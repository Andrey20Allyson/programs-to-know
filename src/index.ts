import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'https';
import { readFile } from 'fs/promises';

const app = express();
const server = createServer(app);

function onGet(req: Request, res: Response, next: NextFunction) {
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
app.get('/data', onGet);
server.listen(80, 'localhost', onServerListen);