// src/components/GroupSection.js
import React from 'react';
import InteractiveCard from './InteractiveCard';

function GroupSection({ group }) {
  const { title, names, links } = group;

  return (
    <div className="group-section mb-5">
        <hr></hr>
      <h2>{title}</h2>
      {names && <p>{names.join(', ')}</p>} {/* Safely join names */}
      <div className="row">
        {links.map((link, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <InteractiveCard geniallyUrl={link} name={names[index]} /> {/* Pass the corresponding name */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSection;
