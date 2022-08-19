import express from 'express';
import { createServer } from 'http';

console.clear();

const app = express();
const server = createServer(app);

app.use(express.static('public'));

server.listen(80, 'localhost', () => {
    console.log('> server is listening on port 80');
});