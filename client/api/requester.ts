import { Requester } from './lib/Requester.js';
import { IRequester } from './lib/Requester.d';
import { TecsRequester } from './lib/TecsRequester.js';
import { TecnologyDTO } from './lib/TecsRequester.d';

export function createTecsRequester(): IRequester<TecnologyDTO> {
    const tecsRequester = new TecsRequester('./api/storage/tecs');

    return tecsRequester;
}