export interface IHTMLGenerator {
    generate(pageName: string, ...args: string[]): Promise<string>;
    requestHTML(pageName: string): Promise<string>;
    setHTML(pageName: string, data: string): void;
}