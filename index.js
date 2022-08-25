import express from 'express';
import { createServer } from 'http';
import { readFile } from 'fs/promises';

console.clear();

const app = express();
const server = createServer(app);

app.use(express.static('public'));

app.get('/data', (req, res, next) => {
    const { type } = req.query;

    if (type === 'json')
        readFile('./data/tecnologies.json', { encoding: 'utf-8' })
        .then(value => {
            res.json(JSON.parse(value));
        });
});

server.listen(80, '192.168.0.140', () => {
    console.log('> server is listening on port 80');
});