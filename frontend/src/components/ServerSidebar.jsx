import React from "react";
import "./ServerSidebar.css";
import { ServerSidebar } from "./ServerSidebarData.js";
// Placeholder channels data
const Mysidebar = {
  height: "100vh",
  width: "17rem",
  overflowX: "hidden",
  overflowY: "scroll",
};
export default function serverSidebar({ serversidebar }) {
  return (
    <>
      <div className={ServerSidebar ? "nav-menu active" : "nav-menu"}>
        <div className="nav-title">
          <p>CHANNELS</p>
        </div>
        {/* Render each channel */}
        <ul className="nav-menu-items">
          <div style={Mysidebar}>
            {ServerSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.class}>
                  <span>{item.title}</span>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </>
  );
}
