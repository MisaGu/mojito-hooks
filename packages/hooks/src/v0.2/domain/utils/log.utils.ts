let logsEnabled = false;

export function enableLogs() {
  logsEnabled = true;
}

export function disableLogs() {
  logsEnabled = false;
}

export function log(...args) {
  if (logsEnabled) console.log(...args);
}
