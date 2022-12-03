import { DownloadList } from './DLLoader.js';

export default function load() {
    const DLInterface = DownloadList.fromContainerId('downloadlist');

    return DLInterface;
}