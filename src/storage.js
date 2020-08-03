export function getItem(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function storeItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function initialState(key, defaultVal) {
  if (!defaultVal) defaultVal = '';
  try { return getItem(key); }
  catch { return defaultVal; }
}