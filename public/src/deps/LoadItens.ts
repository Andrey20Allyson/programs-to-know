import createDownloadListInterface from './DLLoader.js';

export default function load() {
    const DLInterface = createDownloadListInterface('downloadlist', {});

    DLInterface.loadFrom('./data?type=json');

    return DLInterface;
}