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

// make it such that clicking on a board component leads to TMP.js page with that *boardName or id as input?*
// sidebar and messaging.js depend on TMP.js
export default DiscussionBoard;
