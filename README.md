# react-use-storage

Easy use key-value storage in React. LocalStorage, SessionStorage, AsyncStorage and any other key-value storages.

## Install

```bash
// yarn
yarn add @wakeup/react-use-storage

// npm
npm i --save @wakeup/react-use-storage
```

## How to use

### Hooks out of the box: useLocalStorage, useSessionStorage

```tsx
import { useLocalStorage } from '@wakeup/react-use-storage';

const App: FunctionComponent = () => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'colorScheme',
        initialValue: 'dark',
    });

    return (
        <div>
            <h1>Current color scheme: {colorScheme}</h1>
            <button onClick={() => setColorScheme('light')}>Light</button>
            <button onClick={() => setColorScheme('dark')}>Dark</button>
        </div>
    );
};
```

### Custom key-value storage

```tsx
import { inMemoryStorage } from 'awesome-im-memory-storage';
import { useStorage } from '@wakeup/react-use-storage';

const App: FunctionComponent = () => {
    const [colorScheme, setColorScheme] = useStorage({
        key: 'colorScheme',
        initialValue: 'dark',
        storage: inMemoryStorage,
    });

    return (
        <div>
            <h1>Current color scheme: {colorScheme}</h1>
            <button onClick={() => setColorScheme('light')}>Light</button>
            <button onClick={() => setColorScheme('dark')}>Dark</button>
        </div>
    );
};
```

### Async storage

```tsx
import { awesomeAsyncStorage } from 'awesome-async-storage';
import { useAsyncStorage } from '@wakeup/react-use-storage';

const App: FunctionComponent = () => {
    const [colorScheme, setColorScheme] = useAsyncStorage({
        key: 'colorScheme',
        initialValue: 'dark',
        storage: awesomeAsyncStorage,
    });

    return (
        <div>
            <h1>Current color scheme: {colorScheme}</h1>
            <button onClick={() => setColorScheme('light')}>Light</button>
            <button onClick={() => setColorScheme('dark')}>Dark</button>
        </div>
    );
};
```

If you use React Native AsyncStorage, you should serialized value (or wrapped AsyncStorage in a adapter).

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@wakeup/react-use-storage';

const App: FunctionComponent = () => {
    const [value, setValue] = useAsyncStorage({
        key: 'user',
        initialValue: {
            isAuthorized: false,
        },
        storage: AsyncStorage,
    });

    const user = useMemo(() => {
        if (value === null) {
            return value;
        }

        return JSON.parse(value);
    }, [value]);

    const handleSetUser = useCallback(
        async (data) => setValue(JSON.stringify(data)),
        [setValue]
    );

    ...
};
```
