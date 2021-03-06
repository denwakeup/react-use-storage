import { AsyncStorage, Storage, StorageEvent } from '../types';

export const isActualEvent = <V, K>(
    event: StorageEvent,
    storage: Storage<K, V> | AsyncStorage<K, V>,
    key: K
): event is StorageEvent<K, V> =>
    event.key === key && event.storage === storage;
