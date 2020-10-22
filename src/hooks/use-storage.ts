import { useCallback, useEffect, useState } from 'react';
import { Storage } from '../types/storage';
import { Maybe } from '../types/maybe';
import { StorageEvent } from '../types/storage-event';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export interface Params<V, K> {
    key: K;
    initialValue?: Maybe<V>;
    storage: Storage<K>;
}

export const useStorage = <V, K>({
    key,
    storage,
    initialValue = null,
}: Params<V, K>): [Maybe<V>, (data: V) => void, () => void] => {
    const [localValue, setLocalValue] = useState<Maybe<V>>(initialValue);

    useIsomorphicLayoutEffect(() => {
        const storedValue = storage.getItem<V>(key);
        const actualValue = storedValue ?? initialValue;

        setLocalValue(actualValue);

        if (storedValue !== actualValue) {
            storage.setItem(key, actualValue);
        }
    }, [key, initialValue, storage]);

    useEffect(() => {
        const handleStorageValueChange = (event: StorageEvent<K, V>) => {
            if (event.key !== key) {
                return;
            }

            setLocalValue(event.value);
        };

        storage.subscribe(handleStorageValueChange);

        return () => {
            storage.unsubscribe(handleStorageValueChange);
        };
    }, [storage, key]);

    const handleSetValue = useCallback(
        (data: V) => {
            storage.setItem(key, data);
        },
        [key, storage]
    );

    const handleRemoveValue = useCallback(() => {
        storage.removeItem(key);
    }, [key, storage]);

    return [localValue, handleSetValue, handleRemoveValue];
};
