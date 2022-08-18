/**
 * @typedef {{
 *   downloadLink: string;
 *   imgName?: string;
 *   title?: string;
 *   dependences?: string[];
 *   architecture: '86' | '64';
 * }} DownloadItem
 * 
 * @typedef {{
 *   getItem(key: string) => HTMLDivElement;
 *   insertItem(key: string, value: HTMLDivElement) => string?;
 *   removeItem(key: string) => HTMLModElement;
 *   addDownloadItem(opts: DownloadItem) => void;
 * }} DownloadListInterface
 * 
 * @typedef {(containerId: string) => DownloadListInterface} DownloadListInterfaceFactory
 * @typedef {(key: string, value: number) => string} ParseSuffixFunction
 */


/**
 * @example
 * ```
 * const DLInterface = createDownloadListInterface('downloadList');
 * 
 * DLInterface.addDownloadItem({title: 'Visual Studio Code', downloadLink: 'https://www.example.com'});
 * ```
 * @type {DownloadListInterfaceFactory}
 */
function createDownloadListInterface(containerId, settings) {
    if (containerId === undefined)
        throw new Error('param "contanerId" can\'t be undefined!');

    const downloadItens = {};
    const HTMLcontainer = document.getElementById(containerId);
    const rules = {
        canDuplicate: false
    };

    if (HTMLcontainer === null)
        throw new Error(`container with id="${containerId}" not found!`);

    /**@type {ParseSuffixFunction} */
    function parseSuffix(key, value) {
        return key + (value > 0 ? ` [${value}]`: '');
    }

    return {
        getItem(key) {
            return downloadItens[key] ?? null;
        },

        insertItem(key, value) {
            let suffixValue = 0;
            let suffixedKey = parseSuffix(key, suffixValue);
            
            while (downloadItens[suffixedKey]) {
                suffixValue++;
                suffixedKey = parseSuffix(key, suffixValue);
            }

            downloadItens[suffixedKey] = value;
        },

        addDownloadItem(opts) {
            let {downloadLink, imgName, title='N/A', architecture='64', dependences=[]} = opts;
        
            if (!downloadLink)
                throw new Error('required param is not defined!');

            let depsList = '';
            let itemImg = '';

            if (dependences.length > 0) {
                depsList = '<p>dependências:</p><ul>';

                for (let dep of dependences) {
                    depsList += `<li>${dep}</li>`;
                }

                depsList += '</ul>\n';
            }
        
            let div = document.createElement('div');

            if (imgName !== undefined) {
                itemImg = `<img src="imgs/${imgName}.jpeg" alt="not found">`
            }

            div.innerHTML = `
                <div class="title">
                    ${itemImg}
                    <h2>${title}</h2> 
                </div>
                <p>x${architecture} ->
                    <a href="${downloadLink}">download</a>
                </p>
                ${depsList}
            `;
        
            this.insertItem(title, div);
            HTMLcontainer.appendChild(div);

            console.log(downloadItens);
        },

        removeItem(key) {
            
        }
    };
}