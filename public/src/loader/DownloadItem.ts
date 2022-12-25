import { ArchitectureEnum, DownloadItemOptions, IDownloadItem } from './DownloadItem.d'
import { IHTMLGenerator } from './HTMLGenerator.d';
import { HTMLGenerator } from './HTMLGenerator.js';

export class DownloadItem implements IDownloadItem {
    private static generator: IHTMLGenerator = new HTMLGenerator();

    private content?: HTMLElement;
    
    readonly title: string;
    readonly dependences: string[];
    readonly imageUrl: string;
    readonly architecture: ArchitectureEnum;
    readonly description: string;
    readonly downloadUrl: string;

    private constructor(options: DownloadItemOptions) {
        this.title = options.title ?? 'N/A';
        this.dependences = options.dependences ?? [];
        this.imageUrl = options.imageUrl ?? '';
        this.architecture = options.architecture ?? '64';
        this.downloadUrl = options.downloadUrl ?? '';
        this.description = options.desc ?? '';
    }

    setContent(content: HTMLElement): void {
        this.content = content;
    }

    getContent(): HTMLElement {
        if (!this.content) throw new Error('Content hasn\'t initializated!');

        return this.content;
    }

    setHidden(hidden: boolean): void {
        const content = this.getContent();

        content.hidden = hidden;
    }

    isHidden(): boolean {
        return this.getContent().hidden;
    }

    hide(): void {
        this.setHidden(true);
    }

    show(): void {
        this.setHidden(false);
    }

    static async createItem(options: DownloadItemOptions): Promise<IDownloadItem> {
        const item = new this(options);

        await item.initializeContent();
        
        return item;
    }

    async initializeContent() {
        this.setContent(await this.createContent());
    }

    async createContent(): Promise<HTMLElement> {
        const generator = DownloadItem.generator;
        const content = document.createElement('div');

        let deps = '';

        if (this.dependences.length > 0) {
            let list = '';
            
            for (const dependence of this.dependences)
                list += await generator.generate('Dependence', dependence);

            deps = await generator.generate('DependenceList', list);
        }

        content.innerHTML = await generator.generate('DownloadItem', this.imageUrl, this.title, deps, this.architecture, this.downloadUrl);

        return content;
    }
}