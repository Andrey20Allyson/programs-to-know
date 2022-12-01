export type ArchitectureEnum = '86' | '64';

export interface Storage<T> {
    [K: string]: T;
}

export type HideFilterCallback = (d: DownloadItem, s: string) => boolean;

export interface DLIFactoryOptions {
    downloadLink: string;
    imgSrc?: string;
    title?: string;
    dependences?: string[];
    architecture: ArchitectureEnum;
}

export interface DownloadItem {
    container: HTMLDivElement;
    title: string;
    desc: string;
    dependences: string[];
    architecture: ArchitectureEnum;
}

export interface DownloadListInterface {
    showAll(): void;
    hideAll(): void;
    hideFilter(callback: (value: DownloadItem, key: string) => boolean): void;
    getItem(key: string): DownloadItem | undefined;
    insertItem(key: string, value: DownloadItem): string | undefined;
    removeItem(key: string): DownloadItem | undefined;
    addDownloadItem(opts: DLIFactoryOptions): void;
    loadFrom(url: string): Promise<number>;
}

export interface DownloadItemStorage {
    [k: string]: DownloadItem;
}

export default function createDownloadListInterface(containerId: string, settings: any): DownloadListInterface {
    if (containerId === undefined)
        throw new Error('param "contanerId" can\'t be undefined!');

    const downloadItens: DownloadItemStorage = {};
    const HTMLcontainer = document.getElementById(containerId);
    const rules = {
        canDuplicate: false
    };

    if (HTMLcontainer === null)
        throw new Error(`container with id="${containerId}" not found!`);

    function parseSuffix(key: string, value: number) {
        return key + (value > 0 ? ` [${value}]`: '');
    }

    function * downloadItensEntries(): Generator<[string, DownloadItem]> {
        for (let key in downloadItens)
            yield [key, downloadItens[key]];
    }

    return {
        showAll() {
            for (let [key, value] of downloadItensEntries()) {
                value.container.hidden = true;
            }
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

            return suffixedKey;
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
                dependences,
                desc: ''
            });

            HTMLcontainer.appendChild(container);
        },

        async loadFrom(url) {
            const resp = await fetch(url);
            
            const data: DLIFactoryOptions[] = await resp.json();

            data.forEach(value => {
                this.addDownloadItem(value);
            });

            if (resp.status < 400) {
                return 0;
            } else {
                return 1;
            }
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