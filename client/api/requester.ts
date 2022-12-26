import { TecsRequester } from './lib/TecsRequester.js';
import { ArchitectureEnum, TecnologyDTO } from './lib/TecsRequester.d';

export function createTecsRequester(): TecsRequester {
    const tecsRequester = new TecsRequester(document.location.origin + '/api/storage/tecs');

    return tecsRequester;
}

export { ArchitectureEnum, TecnologyDTO };