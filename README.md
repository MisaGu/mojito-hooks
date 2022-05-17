<p align="center">
  <a href="#">
    <img width="200" src="https://github.com/mojitoinc/mixers/blob/main/public/logo.svg">
  </a>
</p>

<div align="center">
A high-quality & reliable React Hooks library.
</div>

## 📚 Documentation

- [English]()

## ✨ Features

- Easy to learn and use
- Supports SSR
- Special treatment for functions, avoid closure problems
- Contains a large number of advanced Hooks that are refined from business scenarios
- Contains a comprehensive collection of basic Hooks
- Written in TypeScript with predictable static types

## 📦 Install

```bash
$ npm install --save @mojito-mixers/hooks
# or
$ yarn add @mojito-mixers/hooks
```

## 🔨 Usage

```TSX
import { MojitoHooksProvider, onErrorCallback, useRequest  } from '@mojito-mixers/hooks';

onErrorCallback((e) => {
  // Log error to Sentry or anywhere you'd like:
  console.log(e);
});

const YourComponent: React.FC = () => {
  const data = useRequest();

  return <pre>{ JSON.stringify(data, null, '  ')}</pre>;
};

const YouApp: React.FC = () => {
  return (
    <MojitoHooksProvider>
      <YourComponent />
    </MojitoHooksProvider>
  );
};
```

## TODO

Sergey is gonna work in the normalizer.

DONE: Review my last PR: Did I delete variables that were used in the key but not in the query?

DOING: Add refetch button + progress bar auto refresh.

DOING: Finish useCollection with serielizer

TODO: New hook which uses this hook/query and return only slug and itemSlug.

TODO: Use react-query to store auth data and get rid of AuthProvider, etc.

TODO: Create backend task to automatically log in with demo account (non-expiring token).
