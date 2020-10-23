import { Maybe } from './maybe';

export interface Storage<K = any, V = any> {
    getItem(key: K): Maybe<V>;
    setItem(key: K, value: V): void;
    removeItem(key: K): void;
}
