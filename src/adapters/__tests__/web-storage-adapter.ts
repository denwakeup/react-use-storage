import { WebStorageAdapter } from '../web-storage-adapter';

describe('WebStorageAdapter', () => {
    const storage = new WebStorageAdapter(localStorage);

    it('WebStorageAdapter should work correctly', () => {
        storage.setItem('name', 'Denny');
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'name',
            JSON.stringify('Denny')
        );

        expect(storage.getItem('name')).toBe('Denny');
        expect(localStorage.getItem).toHaveBeenCalledWith('name');

        storage.removeItem('name');

        expect(storage.getItem('name')).toBeNull();
        expect(localStorage.removeItem).toBeCalledWith('name');
    });
});
