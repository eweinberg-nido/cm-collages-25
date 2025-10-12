// src/components/InteractiveCard.js
import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { highlightMissingUrl,generateGeniallyUrls } from '../utils/utils'; // Import the utility function

import '../App.css';

function InteractiveCard({ geniallyUrl, name }) {
  const [showModal, setShowModal] = useState(false);
  
  // Use the helper function to generate iframe and thumbnail URLs, check if URL exists
  const { iframeUrl, thumbnailUrl } = geniallyUrl
    ? generateGeniallyUrls(geniallyUrl)
    : { iframeUrl: '', thumbnailUrl: '' }; // Handle missing URL case

  return (
    <>
      <Card onClick={() => geniallyUrl && setShowModal(true)} style={{ cursor: geniallyUrl ? 'pointer' : 'default' }}>
        {/* Display the name above the image */}
        <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', textAlign: 'center', marginBottom: '5px' }}>
          {name}
        </span>
        <Card.Img
          variant="top"
          src={thumbnailUrl || 'https://via.placeholder.com/150'} // Use placeholder for missing URL
          alt="Project Thumbnail"
          className="fixed-height-img"
          style={highlightMissingUrl(name, geniallyUrl)} // Apply yellow highlight if URL is missing
        />
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}'s Interactive Graphic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              title="Interactive Graphic"
              style={{ width: '100%', height: '100%' }}  
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No URL available for {name}'s project.</p> // Show a message for missing URLs
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InteractiveCard;