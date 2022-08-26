import createDownloadListInterface from './DLLoader.js';

function load() {
    const DLInterface = createDownloadListInterface('downloadlist');

    DLInterface.loadFrom('./data?type=json');

    return DLInterface;
}

export {load as default};