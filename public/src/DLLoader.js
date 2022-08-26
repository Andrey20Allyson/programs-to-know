/**
 * @
 * @typedef {import('ptk_types').DownloadItem} DownloadItem
 * @typedef {import('ptk_types').Storage<DownloadItem>} DownloadItemStorage
 * @typedef {import('ptk_types').DownloadListInterface} DownloadListInterface
 * @typedef {import('ptk_types').DLIFactoryOptions} DLIFactoryOptions
 * @typedef {(key: string, value: number) => string} ParseSuffixFunction
 */;

/**
 * ## `Example` 
 * 
 * ```js
 * const DLInterface = createDownloadListInterface('downloadList');
 * 
 * DLInterface.addDownloadItem({title: 'Visual Studio Code', downloadLink: 'https://www.example.com'});
 * ```
 * @param {string} containerId
 * @param {any} settings
 * @returns {DownloadListInterface}
 */
function createDownloadListInterface(containerId, settings) {
    if (containerId === undefined)
        throw new Error('param "contanerId" can\'t be undefined!');

    /**@type {DownloadItemStorage} */
    const downloadItens = {};
    const HTMLcontainer = document.getElementById(containerId);
    const rules = {
        canDuplicate: false
    };

    if (HTMLcontainer === null)
        throw new Error(`container with id="${containerId}" not found!`);

    /**
     * 
     * @param {string} key
     * @param {number} value
     * @returns {string}
     */
    function parseSuffix(key, value) {
        return key + (value > 0 ? ` [${value}]`: '');
    }

    /**
     * 
     * @returns {[string, DownloadItem][]}
     */
    function downloadItensEntries() {
        return Object.entries(downloadItens);
    }

    return {
        showAll() {
            downloadItensEntries().map(([key, value]) => {
                value.container.hidden = true;
            })
        },

        hideAll() {
            for (let [key, value] of downloadItensEntries()) {
                value.container.hidden = true;
            }
        },

        hideFilter(callback) {
            for (let [key, value] of downloadItensEntries()) {
                value.container.hidden = callback(value, key)
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
            const { downloadLink, imgSrc, title='N/A', architecture='64', dependences=[] } = opts;
        
            if (!downloadLink)
                throw new Error('required param is not defined!');

            let depsList = '',
                itemImg = '',
                container = document.createElement('div');

            if (dependences.length > 0) {
                depsList = '<p>dependências:</p><ul>';

                for (let dep of dependences) {
                    depsList += `<li>${dep}</li>`;
                }

                depsList += '</ul>\n';
            }

            if (imgSrc !== undefined) {
                itemImg = `<img src="imgs/${imgSrc}.jpeg" alt="not found">`;
            }

            container.innerHTML = `
                <div class="title">
                    ${ itemImg }
                    <h2>${ title }</h2> 
                </div>
                <p>x${ architecture } ->
                    <a href="${ downloadLink }">download</a>
                </p>
                ${ depsList }
            `;
        
            this.insertItem(title, {
                container,
                title,
                architecture,
                dependences
            });

            HTMLcontainer.appendChild(container);
        },

        async loadFrom(url) {
            const resp = await fetch(url);
            /**@type {DLIFactoryOptions[]} */
            const data = await resp.json();

            data.forEach(value => {
                this.addDownloadItem(value);
            });
        },

        removeItem(key) {
            const item = downloadItens[key] ?? null;

            if (item === null)
                return item;

            document.removeChild(item.container);
            delete downloadItens[key];

            return item;
        }
    };
}

export {createDownloadListInterface as default};