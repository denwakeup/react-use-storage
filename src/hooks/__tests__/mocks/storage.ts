import { Maybe, Storage, SubscribeHandler } from '../../../types';

export class MockedStorage<K> implements Storage<K> {
    data: Map<K, any> = new Map();

    handlers: Map<SubscribeHandler<K>, SubscribeHandler<K>> = new Map();

    getItem<V>(key: K): Maybe<V> {
        return this.data.get(key) ?? null;
    }

    setItem<V>(key: K, value: V) {
        this.data.set(key, value);
        this.publish(key, value);
    }

    removeItem(key: K) {
        this.data.delete(key);
        this.publish(key, null);
    }

    subscribe<V>(handler: SubscribeHandler<K, V>) {
        this.handlers.set(handler, handler);
    }

    unsubscribe<V>(handler: SubscribeHandler<K, V>) {
        this.handlers.delete(handler);
    }

    publish<V>(key: K, value: V | null) {
        this.handlers.forEach((handler) => {
            handler({
                key,
                value,
            });
        });
    }
}
