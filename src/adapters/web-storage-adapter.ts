import { Storage as BaseStorage } from '../types/storage';
import { Maybe } from '../types/maybe';
import { SubscribeHandler } from '../types/subscribe-handler';

export class WebStorageAdapter implements BaseStorage<string> {
    storage: Storage | null;

    handlers: Map<
        SubscribeHandler<string, any>,
        SubscribeHandler<string, any>
    > = new Map();

    constructor(storage: Storage | null) {
        this.storage = storage;
    }

    getItem<V>(key: string): Maybe<V> {
        const value = this.storage?.getItem(key);

        if (value === null || typeof value === 'undefined') {
            return null;
        }

        return JSON.parse(value);
    }

    setItem<V>(key: string, value: V) {
        this.storage?.setItem(key, JSON.stringify(value));
        this.publish(key, value);
    }

    removeItem(key: string) {
        this.storage?.removeItem(key);
        this.publish(key, null);
    }

    subscribe<V>(handler: SubscribeHandler<string, V>) {
        this.handlers.set(handler, handler);
    }

    unsubscribe<V>(handler: SubscribeHandler<string, V>) {
        this.handlers.delete(handler);
    }

    publish<K>(key: string, value: K) {
        this.handlers.forEach((handler) => {
            handler({
                key,
                value,
            });
        });
    }
}
