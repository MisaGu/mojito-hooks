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

- Check if the refetch functions return the right shape and are type-checked properly (considering the normalizers and transformFns).
- Next add new `useItemSlug` hook (similar to `useCollectionSlug`) and rename all `slug` props to either `auctionSlug` or `itemSlug`.
- Update `useContentful` hook to have the same functionality `useMojitoFactory` has.
- Extract test/demo constants/ids/etc. to constants...
- Can we type-check queries and variables (check they match) in QueryKey.get and return type in prefetchQuery?

**Not assigned / TODO:**

- Use react-query to store auth data and get rid of AuthProvider, etc.
- Create backend task to automatically log in with demo account (non-expiring token).

---

**Hooks Progress:**

- ❌ Not done.
- 👁️ Needs review.
- ✔️ Done.

| Hook                                     | Code | Demo | Test | Docs |
| ---------------------------------------- | ---- | ---- | ---- | ---- |
| useActiveBids                            | ❌   | ❌   | ❌   | ❌   |
| useCollection                            | ✔️   | ❌   | ❌   | ❌   |
| useCollectionItemBidsList                | ✔️   | ❌   | ❌   | ❌   |
| useCollectionItemCurrentBids             | ✔️   | ❌   | ❌   | ❌   |
| useCollectionItemRemainingCount          | ✔️   | ❌   | ❌   | ❌   |
| useCollectionItemsCurrentBids            | ✔️   | ❌   | ❌   | ❌   |
| useCollectionLotsIdList                  | ✔️   | ❌   | ❌   | ❌   |
| useCollectionSlug                        | ✔️   | ❌   | ❌   | ❌   |
| useContentfulFactory                     | ✔️   | ❌   | ❌   | ❌   |
| useContentfulAuctionsSlugList            | ✔️   | ❌   | ❌   | ❌   |
| useMarketplaceCollectionsSlugWithItemsId | ✔️   | ❌   | ❌   | ❌   |
| useMojitoFactory                         | ✔️   | ❌   | ❌   | ❌   |
