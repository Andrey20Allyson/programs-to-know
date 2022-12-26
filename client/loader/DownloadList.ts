import { DownloadItemOptions, IDownloadItem } from "./DownloadItem.d";
import { DownloadItemStorage, HideFilterCallback, IDownloadList, IIterableStorage, ListSettings, SelectionOptions } from './DownloadList.d';
import { DownloadItem } from "./DownloadItem.js";
import { TecnologyDTO } from '../api/lib/TecsRequester.d';

export class DownloadList implements IDownloadList, IIterableStorage<IDownloadItem> {
    static defaultSettings: ListSettings = {}

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
        const item = this.itens[key];

        if (item === undefined) return item;

        item.getContent().remove();
        delete this.itens[key];

        return item;
    }

    async createItem(opts: TecnologyDTO): Promise<void> {
        opts.title = this.createNewKey(opts.title ?? 'Untitled');
        
        const item = await DownloadItem.createItem(opts);
    
        this.insertItem(item.title, item);

        this.HTMLContainer.appendChild(item.getContent());
    }

    deleteAll() {
        for (const key in this.itens)
            this.deleteItem(key);
    }

    async load(data: TecnologyDTO[]): Promise<void> {
        this.deleteAll();

        for (const value of data)
            await this.createItem(value);
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