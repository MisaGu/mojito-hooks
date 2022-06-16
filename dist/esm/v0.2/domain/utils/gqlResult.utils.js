var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

export function normalizeQueryResult(key, result) {
  var _a;

  var _b = result,
    data = _b.data,
    isLoading = _b.isLoading,
    error = _b.error,
    refetch = _b.refetch,
    queryResult = __rest(_b, ['data', 'isLoading', 'error', 'refetch']);

  return (
    (_a = {
      isLoading: isLoading,
      error: error,
      refetch: refetch,
      queryResult: queryResult,
    }),
    (_a[key] = data),
    _a
  );
}
export function normalizeMutationResult(key, result) {
  var _a;

  var _b = result,
    mutate = _b.mutate,
    mutateAsync = _b.mutateAsync,
    data = _b.data,
    isLoading = _b.isLoading,
    error = _b.error,
    mutationResult = __rest(_b, ['mutate', 'mutateAsync', 'data', 'isLoading', 'error']);

  return (
    (_a = {
      isLoading: isLoading,
      error: error,
      mutate: mutate,
      mutateAsync: mutateAsync,
      mutationResult: mutationResult,
    }),
    (_a[key] = data),
    _a
  );
}
