// src/utils/processGoogleSheetData.js
export function processGoogleSheetData(sheetData) {
    return sheetData.map((entry) => {
      const names = entry.Names.split(',').map(name => name.trim());
  
      // Collect URLs, preserving empty strings
      const urls = [
        entry.URL1 || '',
        entry.URL2 || '',
        entry.URL3 || '',
        entry.URL4 || '',
        entry.URL5 || '',
      ];
  
      // Ensure the number of URLs matches the number of names
      const links = urls.slice(0, names.length);
  
      return {
        title: entry.Product,
        names: names,
        teachers: entry.Teachers,
        block: entry.Block,
        links: links,
      };
    });
  }
  