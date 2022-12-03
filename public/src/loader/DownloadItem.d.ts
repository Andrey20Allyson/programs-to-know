export type ArchitectureEnum = '86' | '64';

export interface DownloadItemOptions {
    title?: string;
    imageSource?: string;
    desc?: string;
    dependences?: string[];
    architecture?: ArchitectureEnum;
    downloadUrl?: string;
}

export interface IDownloadItem {
    createContent(): HTMLElement;
    setContent(content: HTMLElement): void;
    getContent(): HTMLElement;
    getTitle(): string;
    getImageSource(): string;
    getDesc(): string;
    getDependences(): string[];
    getArchitecture(): ArchitectureEnum;
    getDownloadUrl(): string | undefined;
    setHidden(hidden: boolean): void;
    isHidden(): boolean;
    hide(): void;
    show(): void;
}