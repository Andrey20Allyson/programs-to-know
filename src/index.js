"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = require("https");
const promises_1 = require("fs/promises");
const app = (0, express_1.default)();
const server = (0, https_1.createServer)(app);
function onGet(req, res, next) {
    const { type } = req.query;
    if (type === 'json') {
        (0, promises_1.readFile)('./data/tecnologies.json', { encoding: 'utf-8' })
            .then(value => {
            res.json(JSON.parse(value));
        });
    }
}
for (let i of [1, 2].keys()) {
}
function onServerListen() {
    console.log('> Now server is listening https://localhost/');
}
app.use(express_1.default.static('public'));
app.get('/data', onGet);
server.listen(80, 'localhost', onServerListen);
