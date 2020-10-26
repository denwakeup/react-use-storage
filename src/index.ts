import { createUseWebStorage } from './utils/create-use-webstorage';

export const useLocalStorage = createUseWebStorage(
    typeof window === 'undefined' ? null : window.localStorage
);

export const useSessionStorage = createUseWebStorage(
    typeof window === 'undefined' ? null : window.sessionStorage
);

export { useStorage } from './hooks/use-storage';
export { useAsyncStorage } from './hooks/use-async-storage';
export * from './types';
