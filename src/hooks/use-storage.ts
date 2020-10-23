import { useCallback, useEffect, useState } from 'react';
import { Storage } from '../types/storage';
import { Maybe } from '../types/maybe';
import { StorageEvent } from '../types/storage-event';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { storageEventObserver } from '../services/event-observer';
import { isActualEvent } from '../utils/is-actual-event';

export interface Params<V, K> {
    key: K;
    initialValue?: Maybe<V>;
    storage: Storage<K, V>;
}

export const useStorage = <V, K = any>({
    key,
    storage,
    initialValue = null,
}: Params<V, K>): [Maybe<V>, (data: V) => void, () => void] => {
    const [localValue, setLocalValue] = useState<Maybe<V>>(initialValue);

    const handleSetValue = useCallback(
        (data: V) => {
            storage.setItem(key, data);
            storageEventObserver.dispatch({
                storage,
                key,
                value: data,
            });
        },
        [key, storage]
    );

    const handleRemoveValue = useCallback(() => {
        storage.removeItem(key);
        storageEventObserver.dispatch({
            storage,
            key,
            value: null,
        });
    }, [storage, key]);

    useIsomorphicLayoutEffect(() => {
        const storedValue = storage.getItem(key);
        const actualValue = storedValue ?? initialValue;

        setLocalValue(actualValue);

        if (actualValue !== null && storedValue !== actualValue) {
            handleSetValue(actualValue);
        }
    }, [key, initialValue, storage, handleSetValue]);

    useEffect(() => {
        const handleStorageValueChange = (event: StorageEvent) => {
            if (!isActualEvent<V, K>(event, storage, key)) {
                return;
            }

            setLocalValue(event.value);
        };

        storageEventObserver.subscribe(handleStorageValueChange);

        return () => {
            storageEventObserver.unsubscribe(handleStorageValueChange);
        };
    }, [storage, key]);

    return [localValue, handleSetValue, handleRemoveValue];
};
