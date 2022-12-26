import { IDownloadList } from "./loader/DownloadList.d";
import { DownloadList } from './loader/DownloadList.js';
import { createTecsRequester } from './api/requester.js';

function getSearch() {
    const searchInput = document.getElementById('searchIn');

    if (!(searchInput instanceof HTMLInputElement))
        throw new Error('searchInput dont is a HTMLInputElement');

    return searchInput;
}

const searchInput = getSearch();
const tecsRequester = createTecsRequester();

async function onContentLoaded(ev: Event) {
    const tecs = await tecsRequester.get();

    const DLInterface = DownloadList.fromContainerId('downloadlist');

    DLInterface.load(tecs.data ?? []);

    searchInput.addEventListener('keydown', async (ev) => {
        if (ev.key === 'Enter') {
            const { data = [] } = await tecsRequester.get(searchInput.value);
            
            DLInterface.load(data);
        }
    });
}

document.addEventListener('DOMContentLoaded', onContentLoaded);