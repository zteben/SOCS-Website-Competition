import React from "react";
import { Link } from 'react-router-dom';
import "./LandingHome.css"

const LandingHome = () => {

    return (
        <div className="LandingHome">
            <div className="column1">
                <img src="images/chat4.png" className="chat-img" alt=""/>
            </div>
            <div className="column2">
                <div className="slide-containter">
                    <div className="lg-text slide-title">Welcome to McComms!</div>
                </div>
                <p className="md-text">
                    On the official McGill communication platform, you have the opportunity to connect with your peers
                    and instructors. Participate in club activities, organize collaborative group projects, and actively 
                    engage in class discussions. Join us in fostering a rich and interactive academic experience!
                </p>
                <br></br>
                <div className="bot-text">Please <Link to="/login" className="red-link">login</Link> or <Link to="/register" className="red-link">register</Link> to get started.</div>
            </div>
        </div>
    );
};
export default LandingHome;