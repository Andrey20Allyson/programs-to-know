import createDownloadListInterface from './DLLoader.js';

/**
 * 
 * @typedef {import('ptk_types').DownloadListInterface} DownloadListInterface
 * @typedef {import('ptk_types').DLIFactoryOptions} DLIFactoryOptions
 */

function load() {
    const DLInterface = createDownloadListInterface('downloadlist');

    fetch('./data?type=json')
    .then(resp => resp.json())
    .then(/**@type {(data: DLIFactoryOptions[]) => Promise<void>} */ data => {
        data.forEach(value => {
            DLInterface.addDownloadItem(value);
        });
    })
    .catch(reason => {
        console.log(reason);
    });

    return DLInterface;
}

export {load as default};