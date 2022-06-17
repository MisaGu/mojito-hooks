---
nav:
  path: /hooks
  group: Mutations
---

# useMojitoMutation

Wrapper around `react-query`'s [`useMutation(...)`](https://react-query.tanstack.com/reference/useMutation) that handles
authentication automatically, as well as response data transformation.

Also, the mutation function (`mutate`) will be called automatically, unless `auto: false` is passes as an option.

## Examples

<code src="./demo/demo1.tsx" />
