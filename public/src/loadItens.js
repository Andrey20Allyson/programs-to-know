import createDownloadListInterface from './DLLoader.js';

function load() {
    const DLInterface = createDownloadListInterface('downloadlist');

    fetch('./?data=data')

    return DLInterface;
}

export {load as default};