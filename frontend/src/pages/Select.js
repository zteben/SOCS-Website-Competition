// select.js
import React, { useState, useEffect } from 'react';
import DiscussionBoard from '../components/DiscussionBoard'; // Adjust the path based on your project structure

const Select = () => {
  // Assume you have a state to store the list of boards
  const [boards, setBoards] = useState([]);

  // Fetch the list of boards when the component mounts
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('/api/boards/getAllBoards', {
          method: 'GET',
          headers: {
            Authorization: `Bearer YOUR_ACTUAL_ACCESS_TOKEN`, // Replace with your actual access token
          },
        });

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
      <h1>Selecting Page</h1>
      <div>
        {boards.map((board) => (
          <DiscussionBoard key={board._id} boardName={board.name} />
        ))}
      </div>
    </div>
  );
};

export default Select;
