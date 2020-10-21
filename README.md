# react-use-storage

Easy use key-value storage in React. LocalStorage, SessionStorage and any other sync key-value storages.

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
import { useStorage, Storage } from '@wakeup/react-use-storage';

const inMemoryStorageAdapter: Storage<string> = new InMemoryStorageAdapter(inMemoryStorage);

const App: FunctionComponent = () => {
    const [
        colorScheme,
        setColorScheme,
    ] = useStorage({
        key: 'colorScheme',
        initialValue: 'dark',
        storage: inMemoryStorageAdapter;
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
