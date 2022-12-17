import { IHTMLGenerator } from './HTMLGenerator.d';
import { Cache } from './Cache';
import { ICache } from './Cache.d'

export class HTMLRequestError extends Error {
    constructor(pageName: string) {
        super(`${pageName} cant be accessed!`);
    }
}

export class HTMLGenerator implements IHTMLGenerator {
    static readonly replacer = /#.+#/g;
    private cache: ICache;

    constructor() {
        this.cache = new Cache();
    }

    async generate(pageName: string, ...args: string[]): Promise<string> {
        let page = await this.requestHTML(pageName);

        page = page.replace(HTMLGenerator.replacer, sub => args.shift() ?? sub);

        return page;
    }

    async requestHTML(name: string): Promise<string> {
        let cache = this.cache.getCache(name);

        if (cache)
            return cache;

        const resp = await fetch(`./models/${name}.html`);

        if (resp.status >= 400)
            throw new HTMLRequestError(name);

        const data = await resp.text();

        this.setHTML(name, data);

        return data;
    }

    setHTML(name: string, data: string): void {
        this.cache.setCache(name, data);
    }
}