/**
 * ----------->> enums <<-----------
 * 
 * @typedef {'86' | '64'} ArchitectureEnum
 * 
 * ----------->> types <<-----------
 * 
 * @typedef {{
 *   downloadLink: string;
 *   imgSrc?: string;
 *   title?: string;
 *   dependences?: string[];
 *   architecture: ArchitectureEnum;
 * }} DLIFactoryOptions
 * 
 * @typedef {{
 *   element: HTMLDivElement;
 *   title?: string;
 *   desc: string;
 *   dependences: string[];
 *   architecture: ArchitectureEnum;
 * }} DownloadItem
 * 
 * @typedef {{
 *   showAll() => void;
 *   hideAll() => void;
 *   hideFilter(callback: HideFilterCallback) => void;
 *   getItem(key: string) => HTMLDivElement;
 *   insertItem(key: string, value: HTMLDivElement) => string?;
 *   removeItem(key: string) => HTMLModElement;
 *   addDownloadItem(opts: DLIFactoryOptions) => void;
 * }} DownloadListInterface
 * 
 * ----------->> functions <<-----------
 * 
 * @typedef {(containerId: string) => DownloadListInterface} DownloadListInterfaceFactory
 * @typedef {(key: string, value: number) => string} ParseSuffixFunction
 * @typedef {(value: DownloadItem, key: string) => boolean} HideFilterCallback
 */;


/**
 * `@example`
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

    /**@type {() => [string, DownloadItem][]} */
    function downloadItensEntries() {
        return Object.entries(downloadItens);
    }

    return {
        showAll() {
            downloadItensEntries().map(([key, value]) => {
                value.element.hidden = true;
            })
        },

        hideAll() {
            for (let [key, value] of downloadItensEntries()) {
                value.element.hidden = true;
            }
        },

        hideFilter(callback) {
            for (let [key, value] of downloadItensEntries()) {
                value.element.hidden = callback(value, key)
            }
        },

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
            let {downloadLink, imgSrc, title='N/A', architecture='64', dependences=[]} = opts;
        
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

            if (imgSrc !== undefined) {
                itemImg = `<img src="imgs/${imgSrc}.jpeg" alt="not found">`;
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
        
            this.insertItem(title, {
                element: div,
                title,
                architecture,
                dependences
            });

            HTMLcontainer.appendChild(div);
        },

        removeItem(key) {
            document.removeChild(downloadItens[key].element);
            delete downloadItens[key];
        }
    };
}

export {createDownloadListInterface as default};