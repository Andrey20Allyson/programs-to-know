import { DownloadList } from './DownloadList.js';

export default function load() {
    const DLInterface = DownloadList.fromContainerId('downloadlist');

    return DLInterface;
}