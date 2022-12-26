export interface Storage<T> {
    [k: string]: T;
}

export interface ICache {
    getCache(name: string): string | undefined;
    setCache(name: string, data: string): void;
    getSize(): number;
    getMaxSize(): number;
    setMaxSize(value: number): void;
}