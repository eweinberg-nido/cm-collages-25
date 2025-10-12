// src/App.js
import React, { useEffect, useState } from 'react';
import GroupSection from './components/GroupSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchGoogleSheetData } from './utils/fetchGoogleSheet';
import { processGoogleSheetData } from './utils/processGoogleSheetData';

function App() {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const sheetData = await fetchGoogleSheetData();
      const processedData = processGoogleSheetData(sheetData);
      setGroupData(processedData);
    }
    loadData();
  }, []);

  return (
    <div className="container mt-5">
      {groupData.map((group, index) => (
        <GroupSection key={index} group={group} />
      ))}
    </div>
  );
}

export default App;
