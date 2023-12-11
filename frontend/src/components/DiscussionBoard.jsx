import React, { useState, useEffect } from 'react';
import './DiscussionBoard.css';
import { Link } from 'react-router-dom';

const DiscussionBoard = ({ boardName, isDarkMode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(
          `http://localhost:3000/isAdmin/checkAdminStatus?name=${boardName}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [boardName]);

  const handleDeleteClick = async (event) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await fetch('http://localhost:3000/boards/deleteBoard', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          boardname: boardName,
        }),
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? 'rgb(37, 37, 41)' : '#f8f9fa',
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <div className="card" style={containerStyle}>
      <div className="container">
        <h4>{boardName}</h4>
      </div>
      {isAdmin && (
        <div className="delete-icon" onClick={handleDeleteClick}></div>
      )}
    </div>
  );
};

export default DiscussionBoard;
