import React, { useState, useEffect } from 'react';
import './DiscussionBoard.css';

const AddBoardForm = ({ onBoardAdded }) => {
  const [newBoardName, setNewBoardName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const handleInputChange = (event) => {
    setNewBoardName(event.target.value);
  };

  const handleAddBoard = async (event) => {
    event.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3000/boards/createBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          name: newBoardName,
        }),
      });

      if (response.ok) {
        onBoardAdded(newBoardName);

        // Clear the input field
        setNewBoardName('');
      } else {
        console.error('Failed to create board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  useEffect(() => {
    const updateDarkMode = (event) => {
      setIsDarkMode(event.matches);
    };

    const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMatcher.addListener(updateDarkMode);

    return () => {
      darkModeMatcher.removeListener(updateDarkMode);
    };
  }, []);

  const containerStyle = {
    backgroundColor: isDarkMode ? 'rgb(37, 37, 41)' : '#f8f9fa', // Default or dark mode background color
  };

  const headerStyle = {
    color: isDarkMode ? 'white' : 'black', // Text color based on dark mode
  };

  return (
    <div className="card" style={containerStyle}>
      <div className="container">
        <h4 style={headerStyle}>Create a New Board</h4>
        <form onSubmit={handleAddBoard}>
          <input
            type="text"
            placeholder="Board Name"
            value={newBoardName}
            onChange={handleInputChange}
          />
          <button type="submit" style={{ backgroundColor: '#c32626' }}>
            Add Board
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBoardForm;
