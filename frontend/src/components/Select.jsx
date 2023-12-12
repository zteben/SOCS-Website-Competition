// Select.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DiscussionBoard from './DiscussionBoard';
import DirectMessageSidebar from './DirectMessageSidebar';
import AddBoardForm from './AddBoardForm';
import SelectNav from './SelectNav';
import './Select.css';

const Select = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const fetchBoards = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login');
      }
      const response = await fetch(
        'http://localhost:3000/boards/getAllBoardNames',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardAdded = (newBoardName) => {
    fetchBoards();
  };

  const containerStyle = {
    marginLeft: '15rem',
    minHeight: '100vh',
    backgroundColor: isDarkMode ? 'rgb(30,30,33)' : '#efefef',
  };

  const headerStyle = {
    color: isDarkMode ? 'white' : '#c32626',
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

  return (
    <div>
      <div>
        <DirectMessageSidebar directmessagesidebar={true} />
      </div>
      <div>
        <SelectNav />
      </div>
      <div style={containerStyle}>
        <br></br>
        <h1 style={headerStyle}>Your Discussion Boards</h1> <br></br>
        <div>
          <AddBoardForm className="container" onBoardAdded={handleBoardAdded} />
        </div>
        <div style={{ marginTop: '2rem' }}>
          {boards.map((board) => (
            <Link key={board._id} to={`/boards/${board.name}`}>
              <DiscussionBoard boardName={board.name} isDarkMode={isDarkMode} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
