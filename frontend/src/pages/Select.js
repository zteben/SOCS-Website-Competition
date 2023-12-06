// select.js
import React, { useState, useEffect } from 'react';
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
          'http://localhost:3000/boards/getAllBoards',
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
      {/* Add ServerSidebar on the left */}
      <div>
        <h1>Sidetest Page</h1>
        {/* Your home page content */}
        <DirectMessageSidebar directmessagesidebar={true} />
      </div>
      {/* DiscussionBoard components on the right */}
      <div style={{ marginLeft: '17rem' }}>
        <h1>Selecting Page</h1>
        <div>
          {boards.map((board) => (
            <DiscussionBoard key={board._id} boardName={board.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
