// src/utils/geniallyUtils.js

export function generateGeniallyUrls(geniallyUrl) {
  if (!geniallyUrl || geniallyUrl.trim() === '') {
    return { iframeUrl: '', thumbnailUrl: '' }; // Return empty URLs if the original URL is missing or empty
  }

  // Extract the unique ID from the Genially URL
  const urlParts = geniallyUrl.split('/');
  const id = urlParts[3]; // The ID is the 4th part of the URL

  // Generate the iframe and thumbnail URLs
  const iframeUrl = `https://view.genially.com/${id}`;
  const thumbnailUrl = `https://genially-thumbnails.genially.com/${id}.png`;

  return { iframeUrl, thumbnailUrl };
}



export function highlightMissingUrl(name, url) {
  return !url ? { backgroundColor: 'yellow', padding: '5px', borderRadius: '5px' } : {};
}
