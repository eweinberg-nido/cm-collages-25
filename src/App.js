// src/App.js
import React, { useEffect, useState } from 'react';
import GroupSection from './components/GroupSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchGoogleSheetData } from './utils/fetchGoogleSheet';
import { processGoogleSheetData } from './utils/processGoogleSheetData';
import { Nav } from 'react-bootstrap';

function App() {
  const [groupData, setGroupData] = useState([]);
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    async function loadData() {
      const sheetData = await fetchGoogleSheetData();
      const processedData = processGoogleSheetData(sheetData);
      setGroupData(processedData);
      // Set the initial active key to the first teacher combination or 'All'
      if (processedData.length > 0) {
        const teachers = [...new Set(processedData.map(item => item.teachers))];
        setActiveKey(teachers[0] || 'All');
      }
    }
    loadData();
  }, []);

  const teachers = ['All', ...new Set(groupData.map(item => item.teachers))];

  const filteredData = activeKey === 'All' 
    ? groupData 
    : groupData.filter(group => group.teachers === activeKey);

  return (
    <div className="container mt-5">
      <Nav variant="pills" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        {teachers.map(teacher => (
          <Nav.Item key={teacher}>
            <Nav.Link eventKey={teacher}>{teacher}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {filteredData.map((group, index) => (
        <GroupSection key={index} group={group} />
      ))}
    </div>
  );
}

export default App;
