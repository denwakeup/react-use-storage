import { act, renderHook } from '@testing-library/react-hooks';
import { useStorage } from '../use-storage';
import { MockedStorage } from './mocks/storage';
import { Storage } from '../../types/storage';

describe('Test', () => {
    const KEY = 'name';
    let storage: Storage<string>;

    beforeEach(() => {
        storage = new MockedStorage<string>();
    });

    it('value should be null for empty initialValue', () => {
        const { result } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
            })
        );

        expect(result.current[0]).toBeNull();
    });

    it('value should be equal to the initialValue if there is no record in the storage', () => {
        const initialValue = 'Denny';

        const { result } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        expect(result.current[0]).toBe(initialValue);
    });

    it('value should be equal to the value from the store', () => {
        const storedValue = 'Denny';
        const initialValue = 'Not Denny';

        storage.setItem(KEY, storedValue);

        const { result } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
            })
        );

        expect(result.current[0]).toBe(storedValue);

        const { result: resultWithInitialValue } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        expect(resultWithInitialValue.current[0]).toBe(storedValue);
    });

    it('changeValue should work correctly', () => {
        const value = 'Denny';

        const { result } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
            })
        );

        act(() => {
            result.current[1](value);
        });

        expect(result.current[0]).toBe(value);
    });

    it('removeValue should work correctly', () => {
        const initialValue = 'Denny';

        const { result } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toBeNull();
    });

    it('removeValue should work correctly', () => {
        const initialValue = 'Denny';

        const { result } = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toBeNull();
    });

    it('should update value after change params', () => {
        const initialKey = 'name';
        const initialValue = 'Denny';

        const { result, rerender } = renderHook(
            (params: {
                storage: Storage<string>;
                key: string;
                initialValue?: string;
            }) => useStorage(params),
            {
                initialProps: {
                    storage,
                    initialValue,
                    key: initialKey,
                },
            }
        );

        expect(result.current[0]).toBe(initialValue);

        const updatedKey = 'age';
        const updatedValue = '20';

        rerender({
            storage,
            initialValue: updatedValue,
            key: updatedKey,
        });

        expect(result.current[0]).toBe(updatedValue);

        rerender({
            storage,
            key: 'Birthday',
        });

        expect(result.current[0]).toBe(null);
    });

    it('hooks value with some key should be synced', () => {
        const hookData = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
            })
        );

        const anotherHookData = renderHook(() =>
            useStorage({
                key: KEY,
                storage,
                initialValue: 'Denny',
            })
        );

        expect(hookData.result.current[0]).toBe(
            anotherHookData.result.current[0]
        );

        const newValue = 'Steve';

        act(() => {
            hookData.result.current[1](newValue);
        });

        expect(hookData.result.current[0]).toBe(newValue);
        expect(hookData.result.current[0]).toBe(
            anotherHookData.result.current[0]
        );
    });
});
