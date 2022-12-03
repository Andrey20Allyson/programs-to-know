import { IDownloadList } from "./loader/DownloadList.d";
import loadItens from "./loader/LoadItens.js";

function getSearch() {
    const searchInput = document.getElementById('searchIn');

    if (!(searchInput instanceof HTMLInputElement))
        throw new Error('searchInput dont is a HTMLInputElement');

    return searchInput;
}

const searchInput = getSearch();

function onContentLoaded(ev: Event) {
    const DLInterface = loadItens();

    searchInput.addEventListener('keydown', () => setInterval(changeDisplay.bind(undefined, DLInterface), 50));
}

function changeDisplay(DLInterface: IDownloadList) {
    DLInterface.hideBySelection(searchInput.value);
}

document.addEventListener('DOMContentLoaded', onContentLoaded);