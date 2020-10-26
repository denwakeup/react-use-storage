import { useCallback, useEffect, useRef } from 'react';
import { storageEventObserver } from '../services/event-observer';
import { AsyncStorage, Maybe, StorageEvent } from '../types';
import { isActualEvent } from '../utils/is-actual-event';
import { useAsyncSafeState } from './use-async-safe-state';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export interface Params<V, K> {
    key: K;
    initialValue?: Maybe<V>;
    storage: AsyncStorage<K, V>;
}

export const useAsyncStorage = <V, K = any>({
    key,
    storage,
    initialValue = null,
}: Params<V, K>): [
    Maybe<V>,
    (data: V) => Promise<void>,
    () => Promise<void>
] => {
    const [localValue, setLocalValue] = useAsyncSafeState<Maybe<V>>(
        initialValue
    );

    const isTouchedRef = useRef(false);

    const handleSetValue = useCallback(
        async (data: V) => {
            isTouchedRef.current = true;

            await storage.setItem(key, data);

            storageEventObserver.dispatch({
                storage,
                key,
                value: data,
            });
        },
        [key, storage]
    );

    const handleRemoveValue = useCallback(async () => {
        isTouchedRef.current = true;

        await storage.removeItem(key);

        storageEventObserver.dispatch({
            storage,
            key,
            value: null,
        });
    }, [storage, key]);

    useIsomorphicLayoutEffect(() => {
        isTouchedRef.current = false;

        const handler = async () => {
            setLocalValue(initialValue);

            const storedValue = await storage.getItem(key);

            if (isTouchedRef.current) {
                return;
            }

            if (storedValue !== null) {
                setLocalValue(storedValue);
                return;
            }

            if (initialValue !== null) {
                handleSetValue(initialValue);
            }
        };

        handler();
    }, [key, initialValue, storage, handleSetValue]);

    useEffect(() => {
        const handleStorageValueChange = (event: StorageEvent) => {
            if (!isActualEvent(event, storage, key)) {
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
