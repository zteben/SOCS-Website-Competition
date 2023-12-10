// TODO: REDIRECT TO BOARD.JS WHEN USER CLICKS ON A BOARD - isa or mike
// TODO: SEND FRIEND REQ BY SEARCHING BY NAME, ACCEPT FRIEND REQUEST FRONTEND - mike

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiscussionBoard from '../components/DiscussionBoard';
import DirectMessageSidebar from '../components/DirectMessageSidebar';
import AddBoardForm from '../components/AddBoardForm';
// import LandingNav from '../components/LandingNav';
import SelectNav from '../components/SelectNav';

const Select = () => {
  const [boards, setBoards] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const fetchBoards = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/boards/getAllBoardNames',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsbHkiLCJpYXQiOjE3MDIyNDIyMTcsImV4cCI6MTcwMjMyODYxN30.HYbwZQiCVFT9c7bWaiS_xsNdd-PSjPz-ExGNiBuFzLI`, // Replace with your actual access token
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
        {/* <LandingNav /> */}
      </div>
      <div style={containerStyle}>
        <br></br>
        <h1 style={headerStyle}>Your Discussion Boards</h1> <br></br>
        <AddBoardForm onBoardAdded={handleBoardAdded} />
        <div style={{ marginTop: '2rem' }}>
          {boards.map((board) => (
            <Link key={board._id} to={`/boards/${board.name}`}>
              {/* Wrap the entire DiscussionBoard in the Link */}
              <DiscussionBoard boardName={board.name} isDarkMode={isDarkMode} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
