import React, { useState, useEffect, useRef } from 'react';
import { IoIosSettings } from 'react-icons/io';

const Settings = ({ toggleOverlay }) => {
  const handleClick = () => {
    toggleOverlay();
    // Add any other settings-related logic here
  };

  const handleButtonClick = () => {
    togglePopup();
    handleClick();
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Add a ref to the popup content to check if a click is inside the popup
  const popupRef = useRef(null);

  // Add a ref to the "Close Popup" button to trigger a click
  const closeButtonRef = useRef(null);

  // Handle clicks outside the popup
  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      closeButtonRef.current.click();
    }
  };

  // Handle the Escape key press
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeButtonRef.current.click();
    }
  };

  const closePopup = () => {
    togglePopup();
    handleClick();
  };

  // Add event listeners for clicks outside the popup and Escape key press
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Add an effect to handle the body style when the popup is open
  useEffect(() => {
    const body = document.body;
    if (isPopupOpen) {
      body.style.overflow = 'hidden'; // Prevent scrolling when the popup is open
    } else {
      body.style.overflow = ''; // Reset the body overflow when the popup is closed
    }

    // Cleanup function
    return () => {
      body.style.overflow = ''; // Ensure the body overflow is reset when the component is unmounted
    };
  }, [isPopupOpen]);

  return (
    <>
      <div className="settings">
        <button className="settingsButton" onClick={handleButtonClick}>
          {/* <IoIosSettings className="settingsButtonSVG" /> */}
          <IoIosSettings style={{ fontSize: '1.8em' }} />
        </button>
      </div>
      {isPopupOpen && (
        <div className="settings-popup-overlay">
          <div ref={popupRef} className="settings-popup">
            {/* Add your settings content here */}
            <p>Settings Popup Content</p>
            <button className='closePopupButton' ref={closeButtonRef} onClick={closePopup}>
              Close Popup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
