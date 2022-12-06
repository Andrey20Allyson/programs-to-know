import { EventEmitter } from 'events';
import { createServer } from 'net';

const server = createServer(); 

server.on('connection', async socket => {

})

server.listen(8080, 'localhost');

export class DataBase extends EventEmitter {

}