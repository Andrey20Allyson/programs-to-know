import { TecsRequester } from './lib/TecsRequester.js';

export function createTecsRequester(): TecsRequester {
    const tecsRequester = new TecsRequester('./api/storage/tecs');

    return tecsRequester;
}