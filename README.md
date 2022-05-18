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

## Roadmap

**In Development > Sergey:**

- Working in `gqlDataNormalizer.util`.

**In Development > Dani:**

- TODO: When calling useQuery with a custom queryFn, the refetch functions also needs to use that one (we need to bind it).

- All hooks should take a single props param that takes at least an options prop.
- Next add new `useCollectionSlug` hook which uses this hook/query and return only slug and itemSlug.
- Extract test/demo constants/ids/etc. to constants...
- Can we type-check queries and variables (check they match) in QueryKey.get and return type in prefetchQuery?

**Not assigned / TODO:**

- Use react-query to store auth data and get rid of AuthProvider, etc.
- Create backend task to automatically log in with demo account (non-expiring token).

---

**Hooks Progress:**

| Hook          | Code | Demo | Test | Docs |
| ------------- | ---- | ---- | ---- | ---- |
| useActiveBids | ✔️   | ❌   | ❌   | ❌   |
| useCollection | ✔️   | ❌   | ❌   | ❌   |
