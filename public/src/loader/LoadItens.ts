import { DownloadList } from './DownloadList.js';

export default function load() {
    const DLInterface = DownloadList.fromContainerId('downloadlist', {
        loadUrl: './api/storage/tecs?type=json'
    });

    return DLInterface;
}