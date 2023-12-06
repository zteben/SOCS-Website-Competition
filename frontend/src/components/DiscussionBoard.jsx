// DiscussionBoard.jsx
import React from 'react';
import './DiscussionBoard.css';

const DiscussionBoard = ({ boardName }) => {
  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>{boardName}</b>
        </h4>
        <a href={`/boards/${boardName}`}>Select Board</a>
      </div>
    </div>
  );
};

export default DiscussionBoard;
