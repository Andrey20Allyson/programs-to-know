import createDownloadListInterface from './DLLoader.js';

/**
 * 
 * @typedef {import('ptk_types').DownloadListInterface} DownloadListInterface
 * @typedef {import('ptk_types').DLIFactoryOptions} DLIFactoryOptions
 */

async function load() {
    const DLInterface = createDownloadListInterface('downloadlist');

    const resp = await fetch('./data?type=json');
    /**@type {DLIFactoryOptions[]} */
    const data = await resp.json();

    data.forEach(value => {
        DLInterface.addDownloadItem(value);
    });

    return DLInterface;
}

export {load as default};