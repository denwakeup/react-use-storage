export interface StorageEvent<K, V> {
    key: K;
    value: V | null;
}
