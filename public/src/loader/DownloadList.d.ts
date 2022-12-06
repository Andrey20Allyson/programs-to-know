import { ArchitectureEnum, DownloadItemOptions, IDownloadItem } from './DownloadItem.d'

export type HideFilterCallback = (d: IDownloadItem, s: string) => boolean;

export interface SelectionOptions {
    title?: string;
    hide?: boolean;
}

export interface IIterableStorage<T> {
    iterEntries(): Generator<[string, T]>;
    iterValues(): Generator<T>;
    iterKeys(): Generator<string>
}

export interface IDownloadList {
    showAll(): void;
    hideAll(): void;
    hideFilter(callback: (value: IDownloadItem, key: string) => boolean): void;
    hideBySelection(options: SelectionOptions): void;
    getItem(key: string): IDownloadItem | undefined;
    deleteItem(key: string): IDownloadItem | undefined;
    createItem(opts: DownloadItemOptions): void;
    load(): Promise<number>;
}

export interface ListSettings {
    loadUrl?: string;
    loadOnInit?: boolean;
}

export interface DownloadItemStorage {
    [k: string]: IDownloadItem;
}