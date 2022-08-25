import loadItens from "./loadItens.js";

/**@type {HTMLInputElement} */
const searchInput = document.getElementById('searchIn');

/**@type {import("./DLLoader.js").DownloadListInterface} */
let DLInterface = null;

searchInput.addEventListener('keydown', ev => {
    if (!DLInterface) return;
    
    setInterval(() => {
        let keyWords = new Set( searchInput.value.toLowerCase().split(' ') );
        
        DLInterface.hideFilter(value => {

            let searchTitle = value.title.toLowerCase();

            for (let keyWord of keyWords) 
                if (!searchTitle.includes(keyWord)) 
                    return true;
            
            return false;
        });
    }, 50);
});

document.addEventListener('DOMContentLoaded', ev => {
    loadItens()
    .then(DLI => {
        DLInterface = DLI;
    });
});