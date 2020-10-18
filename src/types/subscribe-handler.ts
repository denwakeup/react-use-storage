import { StorageEvent } from './storage-event';

export type SubscribeHandler<K, V = any> = (event: StorageEvent<K, V>) => void;
