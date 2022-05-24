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
- Add new `useItemSlug` hook (similar to `useCollectionSlug`).

**In Development > Dani:**

- Check refetch function return for `useCollectionItemCurrentBids()`.
- Can we type-check queries and variables (check they match) in QueryKey.get and return type in prefetchQuery?
- Get rid of all console.log()s or make them optional / work only in development.

**Not assigned / TODO:**

- Use react-query to store auth data and get rid of AuthProvider, etc.
- Create backend task to automatically log in with demo account (non-expiring token).
- Use Codegen.
- Docs API tables.

**Note:**

- legacy useProfile was sending tags in Sentry, but as it client project specific it was not implemented

---

**Hooks Progress:**

Progress:

- ❌ Not done.
- 🔨 In progress.
- 👁️ Needs review.
- ⛔ Don't have.
- ✔️ Done.

Who's working on it now:

- ⚪ Unassigned
- 🔵 Dani
- 🟢 Sergey

| Hook                                        | Code | Demo | Test | Docs |
| ------------------------------------------- | ---- | ---- | ---- | ---- |
| ⚪ useActiveBids                            | ✔️   | ✔️   | ✔️   | ✔️   |
| ⚪ useCollection                            | ✔️   | ✔️   | ❌   | ✔️   |
| ⚪ useCollectionItemBidsList                | ✔️   | ✔️   | ✔️   | ✔️   |
| ⚪ useCollectionItemCurrentBids             | 👁️   | ✔️   | 👁️   | ✔️   |
| ⚪ useCollectionItemRemainingCount          | ✔️   | ✔️   | ✔️   | ✔️   |
| ⚪ useCollectionItemsCurrentBids            | ✔️   | ✔️   | ✔️   | ✔️   |
| ⚪ useCollectionLotsIdList                  | 👁️   | ✔️   | ✔️   | ✔️   |
| ⚪ useCollectionSlug                        | ✔️   | ✔️   | 👁️   | ✔️   |
| 🔵 useContentfulAuctionsSlugList            | ✔️   | ✔️   | 🔨   | 👁️   |
| 🔵 useContentfulAuthors                     | ✔️   | ✔️   | ❌   | ✔️   |
| 🔵 useContentfulCollectors                  | ✔️   | ✔️   | ❌   | ✔️   |
| 🔵 useContentfulFactory                     | ✔️   | ⛔   | ❌   | ✔️   |
| 🔵 useContentfulLots                        | ✔️   | 👁️   | ❌   | ✔️   |
| 🔵 useContentfulShortLots                   | ✔️   | 👁️   | ❌   | ✔️   |
| 🔵 useFavoriteItems                         | 👁️   | ❌   | ❌   | ✔️   |
| ⚪ useInvoiceDownload                       | ❌   | ❌   | ❌   | 👁️   |
| ⚪ useInvoices                              | 👁️   | ❌   | ❌   | ✔️   |
| ⚪ useLazyMojitoOneLot                      | ❌   | ❌   | ❌   | 👁️   |
| 🔵 useMarketplaceCollectionsSlugWithItemsId | ✔️   | ✔️   | ✔️   | ✔️   |
| 🔵 useMojitoFactory                         | ✔️   | ⛔   | ❌   | ✔️   |
| 🔵 useMojitoItem                            | 👁️   | ❌   | ❌   | 👁️   |
| ⚪ useMojitoMutation                        | 👁️   | ❌   | ❌   | 👁️   |
| 🔵 useMojitoWallets                         | 👁️   | ❌   | ❌   | ✔️   |
| 🔵 useOrganization                          | 👁️   | ❌   | ❌   | ✔️   |
| ⚪ usePlaceBidMutation                      | ❌   | ❌   | ❌   | 👁️   |
| 🔵 useProfile                               | 👁️   | ❌   | ❌   | ✔️   |
| 🔵 useServerTime                            | 👁️   | ❌   | ❌   | ✔️   |

| Utils                      | Code | Test |
| -------------------------- | ---- | ---- |
| 🟢 gqlDataNormalizer.util  | 🔨   | ❌   |
| ⚪ getDehydratedState.util | 👁️   | ❌   |
| ⚪ gqlRequest.util         | 👁️   | ❌   |
