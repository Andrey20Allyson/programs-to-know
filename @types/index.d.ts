declare module "ptk_types" {

    export type ArchitectureEnum = '86' | '64';

    export interface Storage<T> {
        [K: string]: T;
    }

    export function createDownloadListInterface(containerId: string): DownloadListInterface;

    export type HideFilterCallback = function(DownloadItem, string): boolean;

    export interface DLIFactoryOptions {
        downloadLink: string;
        imgSrc?: string;
        title?: string;
        dependences?: string[];
        architecture: ArchitectureEnum;
    };

    export interface DownloadItem {
        container: HTMLDivElement;
        title?: string;
        desc: string;
        dependences: string[];
        architecture: ArchitectureEnum;
    };

    export interface DownloadListInterface {
        showAll(): void;
        hideAll(): void;
        hideFilter(callback: (value: DownloadItem, key: string) => boolean): void;
        getItem(key: string): DownloadItem?;
        insertItem(key: string, value: DownloadItem): string?;
        removeItem(key: string): DownloadItem?;
        addDownloadItem(opts: DLIFactoryOptions): void;
        async loadFrom(url: string): Promise<number>;
    };
}