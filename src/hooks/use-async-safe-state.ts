import { useCallback, useEffect, useRef, useState } from 'react';

export const useAsyncSafeState = <V>(
    initialValue: V
): [V, (value: V) => void] => {
    const isUnmounted = useRef(false);

    const [localValue, setLocalValue] = useState<V>(initialValue);

    const safeSetLocalValue = useCallback((value: V) => {
        if (isUnmounted.current) {
            return;
        }

        setLocalValue(value);
    }, []);

    useEffect(
        () => () => {
            isUnmounted.current = true;
        },
        []
    );

    return [localValue, safeSetLocalValue];
};
