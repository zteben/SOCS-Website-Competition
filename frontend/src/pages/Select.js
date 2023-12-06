// select.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiscussionBoard from '../components/DiscussionBoard'; // Adjust the path based on your project structure
import DirectMessageSidebar from '../components/DirectMessageSidebar';

const Select = () => {
  // Assume you have a state to store the list of boards
  const [boards, setBoards] = useState([]);

  // Fetch the list of boards when the component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/boards/getAllBoardNames',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsbHkiLCJpYXQiOjE3MDE4ODY0MDUsImV4cCI6MTcwMTk3MjgwNX0.DB0RrRd_dTIqQbQU5Z6RaOx201CL6SHSL4yd3FwOK0s`, // Replace with your actual access token
            },
          }
        );

        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <div>
        <DirectMessageSidebar directmessagesidebar={true} />
      </div>
      <div
        style={{ marginLeft: '17rem', paddingLeft: '5rem', marginTop: '2rem' }}
      >
        <h1>Your Discussion Boards</h1>
        <div style={{ marginTop: '2rem' }}>
          {boards.map((board) => (
            <Link key={board._id} to={`/boards/${board.name}`}>
              <DiscussionBoard boardName={board.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
