import { useStorage } from '../hooks/use-storage';
import { WebStorageAdapter } from '../adapters/web-storage-adapter';

export interface Params<V> {
    key: string;
    initialValue?: V | null;
}

export const createUseWebStorage = (webStorage: Storage | null) => {
    const storage = new WebStorageAdapter(webStorage);

    return <V>({ key, initialValue }: Params<V>) =>
        useStorage({
            key,
            initialValue,
            storage,
        });
};
