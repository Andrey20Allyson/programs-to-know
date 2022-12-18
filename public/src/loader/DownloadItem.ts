import { ArchitectureEnum, DownloadItemOptions, IDownloadItem } from './DownloadItem.d'
import { IHTMLGenerator } from './HTMLGenerator.d';
import { HTMLGenerator } from './HTMLGenerator.js';

export class DownloadItem implements IDownloadItem {
    private static generator: IHTMLGenerator = new HTMLGenerator();

    private content: HTMLElement;

    private constructor(content: HTMLElement) {
        this.content = content;
    }

    setContent(content: HTMLElement): void {

    }

    getContent(): HTMLElement {
        return this.content;
    }

    getTitle(): string {
        return '';
    }

    getImageSource(): string {
        return '';
    }

    getDesc(): string {
        return '';
    }

    getDependences(): string[] {
        return [];
    }

    getDownloadUrl(): string | undefined {
        return '';
    }

    setHidden(hidden: boolean): void {
        
    }

    isHidden(): boolean {
        return false;
    }

    hide(): void {
        
    }

    show(): void {

    }

    getArchitecture(): ArchitectureEnum {
        return '64';
    }

    static async createItem(options: DownloadItemOptions): Promise<IDownloadItem> {
        const content = await this.createContent(options);

        const item = new this(content);
        
        return item;
    }

    static async createContent(options: DownloadItemOptions): Promise<HTMLElement> {
        const { architecture = '64', dependences = [], desc = '', downloadUrl = 's', imageUrl: imageSource = '', title = '' } = options;

        console.log(options);

        const content = document.createElement('div');

        let deps = '';

        if (dependences.length > 0) {
            let list = '';
            
            for (const dependence of dependences)
                list += await this.generator.generate('Dependence', dependence);

            deps = await this.generator.generate('DependenceList', list);
        }

        console.log(downloadUrl);

        content.innerHTML = await this.generator.generate('DownloadItem', imageSource, title, deps, architecture, downloadUrl);

        return content;
    }
}