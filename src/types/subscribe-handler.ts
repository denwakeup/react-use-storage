import { StorageEvent } from './storage-event';

export type SubscribeHandler<K, V> = (event: StorageEvent<K, V>) => void;
