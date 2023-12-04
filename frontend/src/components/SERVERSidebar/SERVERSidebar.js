import React from "react";
import "./SERVERSidebar.css";
import { SERVERSidebarData } from "./SERVERSidebarData.js";
// Placeholder channels data
const Mysidebar = {
  height: "100vh",
  width: "17rem",
  overflowX: "hidden",
  overflowY: "scroll",
};
export default function SERVERSidebar({ SERVERsidebar }) {
  return (
    <>
      <div className={SERVERsidebar ? "nav-menu active" : "nav-menu"}>
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
      </div>
    </>
  );
}
