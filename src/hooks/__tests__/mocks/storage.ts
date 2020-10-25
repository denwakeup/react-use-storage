import { Maybe, Storage } from '../../../types';

export class MockedStorage<K> implements Storage<K> {
    data: Map<K, any> = new Map();

    getItem<V>(key: K): Maybe<V> {
        return this.data.get(key) ?? null;
    }

    setItem<V>(key: K, value: V) {
        this.data.set(key, value);
    }

    removeItem(key: K) {
        this.data.delete(key);
    }
}
