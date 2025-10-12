// src/utils/highlightMissingUrls.js

export function highlightMissingUrl(name, url) {
    return !url ? { backgroundColor: 'yellow', padding: '5px', borderRadius: '5px' } : {};
  }
  