export var isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
