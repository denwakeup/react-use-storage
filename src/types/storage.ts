import { Maybe } from './maybe';
import { SubscribeHandler } from './subscribe-handler';

export interface Storage<K = string> {
    getItem<V>(key: K): Maybe<V>;
    setItem<V>(key: K, value: V): void;
    removeItem(key: K): void;
    subscribe<V>(handler: SubscribeHandler<K, V>): void;
    unsubscribe<V>(handler: SubscribeHandler<K, V>): void;
    publish<V>(key: K, value: V): void;
}
