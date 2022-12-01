import { DownloadListInterface } from "./deps/DLLoader.js";
import loadItens from "./deps/LoadItens.js";

function getSearch() {
    const searchInput = document.getElementById('search0In');

    if (!(searchInput instanceof HTMLInputElement))
        throw new Error('searchInput dont is a HTMLInputElement');

    return searchInput;
}

const searchInput = getSearch();

let DLInterface: DownloadListInterface | undefined;

function onContentLoaded(ev: Event) {
    DLInterface = loadItens();
}

function changeDisplay() {
    if (!DLInterface)
            return;
 
    const keyWords = new Set(searchInput.value.toLowerCase().split(' '));

    DLInterface.hideFilter(value => {

        let searchTitle = value.title.toLowerCase() ?? '';

        for (let keyWord of keyWords) {
            if (!searchTitle.includes(keyWord)) 
                return true;
        }

        return false;
    });
}

function onSearchKeyDown(ev: KeyboardEvent) {
    if (!DLInterface)
        return;
    
    setInterval(changeDisplay, 50);
}

searchInput.addEventListener('keydown', onSearchKeyDown);
document.addEventListener('DOMContentLoaded', onContentLoaded);