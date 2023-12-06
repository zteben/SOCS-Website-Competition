import React from 'react';
import './ServerSidebar.css';
import { SERVERSidebarData } from './ServerSidebarData';
// Placeholder channels data
const Mysidebar = {
  height: '100vh',
  width: '17rem',
  overflowX: 'hidden',
  overflowY: 'scroll',
};
export default function serverSidebar({ serversidebar }) {
  return (
    <>
      <nav className={serversidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className="nav-title">
          <p>CHANNELS</p>
        </div>
        {/* Render each channel */}
        <ul className="nav-menu-items">
          <div style={Mysidebar}>
            {SERVERSidebarData.map((item, index) => {
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
