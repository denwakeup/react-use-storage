import { Maybe } from './maybe';

export interface AsyncStorage<K = any, V = any> {
    getItem(key: K): Promise<Maybe<V>>;
    setItem(key: K, value: V): Promise<void>;
    removeItem(key: K): Promise<void>;
}
