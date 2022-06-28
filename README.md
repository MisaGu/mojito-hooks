<p align="center">
  <a href="#">
    <img width="200" src="https://github.com/mojitoinc/mixers/blob/main/public/logo.svg">
  </a>
</p>

<div align="center">
A high-quality & reliable React Hooks library. 
</div>

<!-- ## 📚 Documentation

- [English]() -->

## ✨ Features

- Easy to learn and use
- Contains a large number of advanced Hooks that are refined from business scenarios
- Written in TypeScript with predictable static types

## 📦 Install

```bash
$ npm install --save @mojitonft/hooks
# or
$ yarn add @mojitonft/hooks
```

## 🔨 Usage

```TSX
import { MojitoHooksProvider, onErrorCallback, useServerTime  } from '@mojitonft/hooks';

onErrorCallback((e) => {
  // Log error to Sentry or anywhere you'd like:
  console.error(e);
});

const Component: React.FC = () => {
  const data = useServerTime();

  return <pre>{ JSON.stringify(data, null, '  ')}</pre>;
};

const App: React.FC = () => {
  return (
    <MojitoHooksProvider>
      <YourComponent />
    </MojitoHooksProvider>
  );
};
```
 
