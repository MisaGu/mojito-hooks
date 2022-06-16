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
$ npm install --save @mojitonft/hooks
# or
$ yarn add @mojitonft/hooks
```

## 🔨 Usage

```TSX
import { MojitoHooksProvider, onErrorCallback, useRequest  } from '@mojitonft/hooks';

onErrorCallback((e) => {
  // Log error to Sentry or anywhere you'd like:
  console.error(e);
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

**In Development:**

- Working in `gqlDataNormalizer.util`.
- Add new `useItemSlug` hook (similar to `useCollectionSlug`).
- Check refetch function return for `useCollectionItemCurrentBids()`.
- Can we type-check queries and variables (check they match) in QueryKey.get and return type in prefetchQuery?

**TODO:**

- useCollectionItemCurrentBids - add select functionality on original request
- useCollectionItemBidsList - item id should be automatically taken from url;
- MHP - add notitfication about the server timezone and time - so the client will know how to adjust the client time and by.
- After docs complete check all gql requests that it contains all possible data from the API
- REFACTOR path.util
- memoise every fn in marketplaceCollectionsInfoWithItemsIdAndSlug.util
- rename useCollectionsInfo folder to useCollectionsDetails
- rename useLazyMojitoOneLot folder to useCollectionItemById
- rename useProfile folder to useUser
- remove all contentful hooks 🤦‍♂️
- normalize all contentful responses so they do not have any null values (strings or arrays only)

- Use Codegen.
- Add force option to all hooks. Is this the best implementation (removeQuery vs refetch).
- Rename almost everything that say "auction" to collection.

- Use react-query to store auth data and get rid of AuthProvider, etc.
- When calling refetch on `useMarketplaceCollectionsSlugWithItemsId`, results are sorted differently.
- Rename "Query" types/interfaces. See IMojitoMarketplaceResponse, IIMojitoCollectionBySlugRequest...

**Note:**

- legacy useProfile was sending tags in Sentry, but as it client project specific it was not implemented
