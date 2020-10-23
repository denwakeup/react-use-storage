import { StorageEvent, StorageEventHandler } from '../types';

class StorageEventObserver {
    handlers = new Map();

    subscribe(handler: StorageEventHandler) {
        this.handlers.set(handler, handler);
    }

    unsubscribe(handler: StorageEventHandler) {
        this.handlers.delete(handler);
    }

    dispatch(data: StorageEvent<any, any>) {
        this.handlers.forEach((handler) => {
            handler(data);
        });
    }
}

export const storageEventObserver = new StorageEventObserver();
