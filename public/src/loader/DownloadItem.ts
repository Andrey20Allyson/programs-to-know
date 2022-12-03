import { ArchitectureEnum, DownloadItemOptions, IDownloadItem } from './DownloadItem.d'

function createUpperDiv(title: string, imgSrc: string) {
    const h2 = document.createElement('h2')
    h2.textContent = title;

    const img = document.createElement('img')
    img.src = imgSrc;
    img.alt = 'not found';

    const upperDiv = document.createElement('div');
    upperDiv.classList.add('title');
    upperDiv.appendChild(img);
    upperDiv.appendChild(h2);

    return upperDiv;
}

function createDependenceList(dependences: string[]): DocumentFragment {
    const fragment = document.createDocumentFragment();

    const title = document.createElement('p');
    title.textContent = 'dependências:'
    fragment.appendChild(title);

    const list = document.createElement('ul');
    const listFragment = document.createDocumentFragment();

    for (let dep of dependences) {
        const item = document.createElement('li');

        item.textContent = dep;

        listFragment.appendChild(item);
    }

    list.appendChild(listFragment);
    fragment.appendChild(list);

    return fragment;
}

function createDownloadLink(architecture: string, url: string) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = 'Download';

    const paragrath = document.createElement('p');
    paragrath.textContent = `x${architecture} -> `
    paragrath.appendChild(anchor);

    return paragrath;
}

export class DownloadItem implements IDownloadItem {
    private title: string = 'untitled';
    private imageSource: string = './imgs/not_found.jpeg';
    private architecture: ArchitectureEnum = '64';
    private dependences: string[] = [];
    private downloadUrl?: string;
    private desc: string = '';

    private content: HTMLElement;

    constructor(options: DownloadItemOptions = {}) {
        Object.assign(this, options);

        this.content = this.createContent();
    }

    setHidden(hidden: boolean): void {
        this.content.hidden = hidden;
    }

    isHidden(): boolean {
        return this.content.hidden;
    }

    getTitle(): string {
        return this.title;
    }

    getImageSource(): string {
        return this.imageSource;
    }

    getDesc(): string {
        return this.desc;
    }

    getDependences(): string[] {
        return Array.from(this.dependences);
    }

    getArchitecture(): ArchitectureEnum {
        return this.architecture;
    }

    getDownloadUrl(): string | undefined {
        return this.downloadUrl ?? undefined;
    }

    createContent(): HTMLElement {
        const content = document.createElement('div');

        const upperDiv = createUpperDiv(this.title, this.imageSource);
        content.appendChild(upperDiv);

        if (this.downloadUrl) {
            const downloadLinkFragment = createDownloadLink(this.architecture, this.downloadUrl);
            content.appendChild(downloadLinkFragment);

        }

        if (this.dependences.length > 0) {
            const dependences = createDependenceList(this.dependences);
            content.appendChild(dependences)

        };

        return content;
    }

    setContent(content: HTMLElement): void {
        this.content = content;
    }

    getContent(): HTMLElement {
        return this.content;
    }

    hide(): void {
        this.content.hidden = true;
    }

    show(): void {
        this.content.hidden = false;
    }
}