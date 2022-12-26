import { ICache, Storage } from './Cache.d';

export class Cache implements ICache {
    private storage: Storage<string>;
    private maxSize: number;
    private size: number;

    constructor() {
        this.storage = {};
        this.size = 0;
        this.maxSize = 8;
    }

    setCache(name: string, data: string): void {
        if (!this.storage[name])
            this.size++;

        if (this.size > this.maxSize) {
            let removeKey = '';
            let maxLen = 0;

            for (let k in this.storage) {
                let len = this.storage[k].length;
                if (len > maxLen) {
                    removeKey = k;
                    maxLen = len;
                }
            }

            delete this.storage[removeKey];
            this.size--;
        }

        this.storage[name] = data;
    }

    getSize(): number {
        return this.size;
    }

    setMaxSize(value: number): void {
        this.maxSize = value;
    }
    
    getCache(name: string): string | undefined {
        return this.storage[name];
    }

    getMaxSize(): number {
        return this.maxSize;
    }
}