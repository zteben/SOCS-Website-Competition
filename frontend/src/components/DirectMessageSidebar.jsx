// TODO: REDIRECT TO THE APPROPRIATE MESSAGE.JS WHEN USER CLICKS ON A DM - isa or mike

import React from 'react';
import { directMessageSidebarData } from './DirectMessageSidebarData';
import './DirectMessageSidebar.css';
const Mysidebar = {
  height: '100vh',
  width: '17rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
};
export default function directMessageSidebar({ directmessagesidebar }) {
  return (
    <>
      <nav className={directmessagesidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className="nav-title">
          <p>DIRECT MESSAGES</p>
        </div>
        <ul className="nav-menu-items">
          <div style={Mysidebar}>
            {directMessageSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.class}>
                  <span>{item.title}</span>
                </li>
              );
            })}
          </div>
        </ul>
      </nav>
    </>
  );
}
