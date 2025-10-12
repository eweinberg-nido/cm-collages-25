// src/utils/fetchGoogleSheet.js
import Papa from 'papaparse';

export async function fetchGoogleSheetData() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTaF_vXT17JoVi1DgIOnItEOq4vc3yP9uL5c-1Qd5ras8CJ3MKsE5JxWbJBdW9LAyAVTPB34hiGL7Ka/pub?output=csv';
  
    
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