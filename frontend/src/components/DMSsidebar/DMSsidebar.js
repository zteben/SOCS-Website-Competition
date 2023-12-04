import React from "react";
import { DMSSidebarData } from "./DMSSidebarData";
import "./DMSsidebar.css";
const Mysidebar = {
  height: "100vh",
  width: "17rem",
  overflowX: "hidden",
  overflowY: "scroll",
};
export default function DMSSidebar({ DMSsidebar }) {
  return (
    <>
      <nav className={DMSsidebar ? "nav-menu active" : "nav-menu"}>
        <div className="nav-title">
          <p>DIRECT MESSAGES</p>
        </div>
        <ul className="nav-menu-items">
          <div style={Mysidebar}>
            {DMSSidebarData.map((item, index) => {
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
