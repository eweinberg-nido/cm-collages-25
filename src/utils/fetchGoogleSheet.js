// src/utils/fetchGoogleSheet.js
import Papa from 'papaparse';

export async function fetchGoogleSheetData() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQz-ucQl3DrlNFuo4UrsqL6sdbq4ic4bYO6FfRndy2SqJudpw7bebCTTPJICXRjyE6t2yybkEBdsxpP/pub?output=csv';
  
    
  try {
    const response = await fetch(url);
    const csvText = await response.text();

    // Parse the CSV data using Papa Parse
    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: false, // Do not skip empty lines
    });

    const data = parsedData.data;

    return data;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    return [];
  }
}