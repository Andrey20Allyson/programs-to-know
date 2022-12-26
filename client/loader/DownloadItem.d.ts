export type ArchitectureEnum = '86' | '64';

export interface DownloadItemOptions {
    title?: string;
    imageUrl?: string;
    desc?: string;
    dependences?: string[];
    architecture?: ArchitectureEnum;
    downloadUrl?: string;
}

export interface IDownloadItem {
    title: string;
    imageUrl: string;
    dependences: string[];
    description: string;
    architecture: ArchitectureEnum;
    downloadUrl: string; 

    setContent(content: HTMLElement): void;
    getContent(): HTMLElement;
    setHidden(hidden: boolean): void;
    isHidden(): boolean;
    hide(): void;
    show(): void;
}