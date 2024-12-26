interface CacheItem<T> {
    data: T;
    timestamp: number;
}

export class Cache {
    private storage = new Map<string, CacheItem<any>>();
    private readonly TTL: number;

    constructor(ttlMinutes: number = 5) {
        this.TTL = ttlMinutes * 60 * 1000; // Convert minutes to milliseconds
    }

    set<T>(key: string, data: T): void {
        this.storage.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    get<T>(key: string): T | null {
        const item = this.storage.get(key);
        if (!item) return null;

        const isExpired = Date.now() - item.timestamp > this.TTL;
        if (isExpired) {
            this.storage.delete(key);
            return null;
        }

        return item.data as T;
    }

    clear(): void {
        this.storage.clear();
    }
}

// Create a singleton instance
export const cache = new Cache(5); // 5 minutes TTL
