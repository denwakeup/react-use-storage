import { Maybe } from './maybe';
import { Storage } from './storage';

export interface StorageEvent<K = unknown, V = unknown> {
    key: K;
    value: Maybe<V>;
    storage: Storage<K>;
}
