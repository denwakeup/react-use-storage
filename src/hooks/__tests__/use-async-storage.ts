import { renderHook } from '@testing-library/react-hooks';
import { useAsyncStorage } from '../use-async-storage';
import { MockedAsyncStorage } from './mocks/async-storage';
import { AsyncStorage } from '../../types';

describe('Test', () => {
    const KEY = 'name';
    let storage: AsyncStorage<string>;

    beforeEach(() => {
        storage = new MockedAsyncStorage<string>();
    });

    it('value should be null for empty initialValue', async () => {
        const { result } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
            })
        );

        expect(result.current[0]).toBeNull();
    });

    it('value should be equal to the initialValue if there is no record in the storage', () => {
        const initialValue = 'Denny';

        const { result } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        expect(result.current[0]).toBe(initialValue);
    });

    it('value should be equal to the value from the store', async () => {
        const storedValue = 'Denny';
        const initialValue = 'Not Denny';

        await storage.setItem(KEY, storedValue);

        const { result, waitForNextUpdate } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
            })
        );

        await waitForNextUpdate();

        expect(result.current[0]).toBe(storedValue);

        const {
            result: resultWithInitialValue,
            waitForNextUpdate: otherWaitForNextUpdate,
        } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        await otherWaitForNextUpdate();

        expect(resultWithInitialValue.current[0]).toBe(storedValue);
    });

    it('changeValue should work correctly', async () => {
        const value = 'Denny';

        const { result, waitForNextUpdate } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
            })
        );

        result.current[1](value);

        await waitForNextUpdate();

        expect(result.current[0]).toBe(value);
    });

    it('removeValue should work correctly', async () => {
        const initialValue = 'Denny';

        const { result, waitForNextUpdate } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        result.current[2]();

        await waitForNextUpdate();

        expect(result.current[0]).toBeNull();
    });

    it('removeValue should work correctly', async () => {
        const initialValue = 'Denny';

        const { result, waitForNextUpdate } = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
                initialValue,
            })
        );

        result.current[2]();

        await waitForNextUpdate();

        expect(result.current[0]).toBeNull();
    });

    it('should update value after change params', async () => {
        const initialKey = 'name';
        const initialValue = 'Denny';

        const { result, rerender } = renderHook(
            (params: {
                storage: AsyncStorage<string>;
                key: string;
                initialValue?: string;
            }) => useAsyncStorage(params),
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

    it('hooks value with some key should be synced', async () => {
        const hookData = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
            })
        );

        const anotherHookData = renderHook(() =>
            useAsyncStorage({
                key: KEY,
                storage,
                initialValue: 'Denny',
            })
        );

        await hookData.waitForNextUpdate();

        expect(hookData.result.current[0]).toBe(
            anotherHookData.result.current[0]
        );

        const newValue = 'Steve';

        hookData.result.current[1](newValue);

        await Promise.all([
            hookData.waitForNextUpdate(),
            anotherHookData.waitForNextUpdate(),
        ]);

        expect(hookData.result.current[0]).toBe(newValue);
        expect(hookData.result.current[0]).toBe(
            anotherHookData.result.current[0]
        );
    });
});
