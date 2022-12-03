export type ArchitectureEnum = '86' | '64';

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

export interface SelectionOptions {
    title?: string;
}

export interface IIterableStorage<T> {
    iterEntries(): Generator<[string, T]>;
    iterValues(): Generator<T>;
    iterKeys(): Generator<string>
}

export interface IDownloadList {
    showAll(): void;
    hideAll(): void;
    hideFilter(callback: (value: DownloadItem, key: string) => boolean): void;
    hideBySelection(keyWords: string): void;
    getItem(key: string): DownloadItem | undefined;
    deleteItem(key: string): DownloadItem | undefined;
    createItem(opts: DLIFactoryOptions): void;
    load(): Promise<number>;
}

export interface ListSettings {
    loadUrl?: string;
    loadOnInit?: boolean;
}

export interface DownloadItemStorage {
    [k: string]: DownloadItem;
}

export class DownloadList implements IDownloadList, IIterableStorage<DownloadItem> {
    static defaultSettings: ListSettings = {
        loadUrl: undefined,
        loadOnInit: true,
    }

    private itens: DownloadItemStorage = {};
    private HTMLContainer: HTMLElement;
    private settings: ListSettings;

    constructor(container: HTMLElement, settings: ListSettings) {
        this.HTMLContainer = container;
        this.settings = settings;

        this.loadSettings();
    }

    hideBySelection(text: string): void {
        const keyWords = new Set(text.toLowerCase().split(' '));

        this.hideFilter(item => {
            let searchTitle = item.title.toLowerCase();

            for (let keyWord of keyWords)
                if (!searchTitle.includes(keyWord))
                    return true;

            return false;
        });
    }

    * iterEntries(): Generator<[string, DownloadItem]> {
        for (let key in this.itens)
            yield [key, this.itens[key]];
    }

    * iterValues(): Generator<DownloadItem> {
        for (let key in this.itens)
            yield this.itens[key];
    }

    * iterKeys(): Generator<string> {
        for (let key in this.itens)
            yield key;
    }

    showAll(): void {
        for (let [key, value] of this.iterEntries())
            value.container.hidden = false;
    }

    hideAll(): void {
        for (let [key, value] of this.iterEntries())
            value.container.hidden = true;
    }

    hideFilter(callback: (value: DownloadItem, key: string) => boolean): void {
        for (let [key, value] of this.iterEntries())
            value.container.hidden = callback(value, key)
    }

    getItem(key: string): DownloadItem | undefined {
        return this.itens[key];
    }

    deleteItem(key: string): DownloadItem | undefined {
        const item = this.itens[key] ?? null;

        if (item === null)
            return item;

        document.removeChild(item.container);
        delete this.itens[key];

        return item;
    }

    createItem(opts: DLIFactoryOptions): void {
        const { downloadLink, imgSrc, title='N/A', architecture='64', dependences=[] } = opts;
        
        if (!downloadLink)
            throw new Error('required param is not defined!');

        let depsList = '',
            itemImg = '',
            container = document.createElement('div');

        if (dependences.length > 0) {
            depsList = '<p>dependências:</p><ul>';

            for (let dep of dependences)
                depsList += `<li>${dep}</li>`;

            depsList += '</ul>\n';
        }

        if (imgSrc !== undefined)
            itemImg = `<img src="${imgSrc}" alt="not found">`;

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

        this.HTMLContainer.appendChild(container);
    }

    async load(): Promise<number> {
        if (!this.settings.loadUrl) return 2;

        const resp = await fetch(this.settings.loadUrl);
            
            const data: DLIFactoryOptions[] = await resp.json();

            data.forEach(value => {
                this.createItem(value);
            });

        if (resp.status < 400) {
            return 0;
        } else {
            return 1;
        };
    }

    private insertItem(key: string, value: DownloadItem): string {
        let suffixValue = 0;
        let suffixedKey = DownloadList.parseSuffix(key, suffixValue);
        
        while (this.itens[suffixedKey]) {
            suffixValue++;
            suffixedKey = DownloadList.parseSuffix(key, suffixValue);
        }

        this.itens[suffixedKey] = value;

        return suffixedKey;
    }

    private loadSettings() {
        if (this.settings.loadOnInit === true) {
            this.load();
        }
    }

    static fromContainerId(containerId: string, settings: ListSettings = {}) {
        const element = document.getElementById(containerId); 

        if (!element) throw new Error(`container with id="${containerId}" not found!`);

        const DLList = new this(element, settings);

        return DLList;
    }

    private static parseSuffix(key: string, value: number) {
        return key + (value > 0 ? ` [${value}]`: '');
    }
}