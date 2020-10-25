import { Maybe, AsyncStorage } from '../../../types';

const MIN_DELAY = 50;
const MAX_DELAY = 150;

const delay = () =>
    new Promise((resolve) => {
        const duration =
            MIN_DELAY + Math.random() * (MAX_DELAY + 1 - MIN_DELAY);

        setTimeout(() => {
            resolve();
        }, duration);
    });

export class MockedAsyncStorage<K> implements AsyncStorage<K> {
    data: Map<K, any> = new Map();

    async getItem<V>(key: K): Promise<Maybe<V>> {
        await delay();

        return this.data.get(key) ?? null;
    }

    async setItem<V>(key: K, value: V) {
        await delay();

        this.data.set(key, value);
    }

    async removeItem(key: K) {
        await delay();

        this.data.delete(key);
    }
}
