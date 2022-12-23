import { DownloadItemOptions, IDownloadItem } from "./DownloadItem.d";
import { DownloadItemStorage, HideFilterCallback, IDownloadList, IIterableStorage, ListSettings, SelectionOptions } from './DownloadList.d';
import { DownloadItem } from "./DownloadItem.js";

export class DownloadList implements IDownloadList, IIterableStorage<IDownloadItem> {
    static defaultSettings: ListSettings = {
        loadUrl: undefined,
        loadOnInit: true,
    }

    private itens: DownloadItemStorage = {};
    private HTMLContainer: HTMLElement;
    private settings: ListSettings;

    constructor(container: HTMLElement, settings: ListSettings = {}) {
        this.HTMLContainer = container;
        this.settings = Object.assign({}, DownloadList.defaultSettings, settings);

        this.loadSettings();
    }

    hideBySelection(options: SelectionOptions): void {
        const { title, hide = true } = options;

        if (title) {
            const keyWords = new Set(title.toLowerCase().split(' '));

            this.hideFilter(item => {
                let searchTitle = item.title.toLowerCase();

                for (let keyWord of keyWords)
                    if (!searchTitle.includes(keyWord))
                        return hide;

                return !hide;
            });
        }
    }

    * iterEntries(): Generator<[string, IDownloadItem]> {
        for (let key in this.itens)
            yield [key, this.itens[key]];
    }

    * iterValues(): Generator<IDownloadItem> {
        for (let key in this.itens)
            yield this.itens[key];
    }

    * iterKeys(): Generator<string> {
        for (let key in this.itens)
            yield key;
    }

    showAll(): void {
        for (let [key, value] of this.iterEntries())
            value.show();
    }

    hideAll(): void {
        for (let [key, value] of this.iterEntries())
            value.hide
    }

    hideFilter(callback: HideFilterCallback): void {
        for (let [key, value] of this.iterEntries()) {
            const hide = callback(value, key);
            value.setHidden(hide);
        }
    }

    getItem(key: string): IDownloadItem | undefined {
        return this.itens[key];
    }

    deleteItem(key: string): IDownloadItem | undefined {
        const item = this.itens[key] ?? null;

        if (item === null)
            return item;

        document.removeChild(item.getContent());
        delete this.itens[key];

        return item;
    }

    async createItem(opts: DownloadItemOptions): Promise<void> {
        opts.title = this.createNewKey(opts.title ?? 'Untitled');
        
        const item = await DownloadItem.createItem(opts);
    
        this.insertItem(item.title, item);

        this.HTMLContainer.appendChild(item.getContent());
    }

    async load(): Promise<number> {
        if (!this.settings.loadUrl) return 2;

        const resp = await fetch(this.settings.loadUrl);
        
        const data: DownloadItemOptions[] = await resp.json();

        for (const value of data)
            await this.createItem(value);

        if (resp.status < 400) {
            return 0;
        } else {
            return 1;
        };
    }

    private createNewKey(key: string) {
        let suffixValue = 0;
        let suffixedKey = DownloadList.parseSuffix(key, suffixValue);
        
        while (this.itens[suffixedKey]) {
            suffixValue++;
            suffixedKey = DownloadList.parseSuffix(key, suffixValue);
        }

        return suffixedKey;
    }

    private insertItem(key: string, value: IDownloadItem): string {
        this.itens[key] = value;

        return key;
    }

    private loadSettings() {
        if (this.settings.loadOnInit === true) {
            this.load();
        }
    }

    static fromContainerId(containerId: string, settings?: ListSettings) {
        const element = document.getElementById(containerId); 

        if (!element) throw new Error(`container with id="${containerId}" not found!`);

        const DLList = new this(element, settings);

        return DLList;
    }

    private static parseSuffix(key: string, value: number) {
        return key + (value > 0 ? ` [${value}]`: '');
    }
}