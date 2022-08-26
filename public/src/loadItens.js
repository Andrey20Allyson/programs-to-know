import createDownloadListInterface from './DLLoader.js';

/**
 * 
 * @typedef {import('ptk_types').DownloadListInterface} DownloadListInterface
 * @typedef {import('ptk_types').DLIFactoryOptions} DLIFactoryOptions
 */

function load() {
    const DLInterface = createDownloadListInterface('downloadlist');

    DLInterface.loadFrom('./data?type=json');

    return DLInterface;
}

export {load as default};