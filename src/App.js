// src/App.js
import React, { useEffect, useState } from 'react';
import GroupSection from './components/GroupSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchGoogleSheetData } from './utils/fetchGoogleSheet';
import { processGoogleSheetData } from './utils/processGoogleSheetData';
import { Nav } from 'react-bootstrap';
import Login from './components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [groupData, setGroupData] = useState([]);
  const [activeKey, setActiveKey] = useState('');
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>CM Collages</h1>
        <Login user={user} setUser={setUser} />
      </div>
      <Nav variant="pills" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        {teachers.map(teacher => (
          <Nav.Item key={teacher}>
            <Nav.Link eventKey={teacher}>{teacher}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {filteredData.map((group, index) => (
        <GroupSection key={index} group={group} user={user} />
      ))}
    </div>
  );
}

export default App;
