import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import './LandingNav.css';

const LandingNav = () => {
    useEffect(() => {
        function updateLogo() {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const logo = document.getElementById('navbar-logo');


            if (logo) {
                if (isDarkMode) {
                logo.src = 'images/bird_white.png';
                } else {
                logo.src = 'images/bird.png';
                }
            };
        };
        updateLogo();
        // Listen for changes in color scheme and update the logo accordingly
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLogo);
        // Clean up the event listener on component unmount
        return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateLogo);
        };
    }, []);

    return (
        <nav className="LandingNav navbar ">
            <Link to="/home" className="d-flex align-items-center no-deco">
                <img
                    id="navbar-logo"
                    src="images/bird.png"
                    alt="McGill Logo"
                    width="40"
                    height="40"
                />
                <div className="navbar-brand brand-logo">McComms</div>
            </Link>

            <Link to="/login" className="ml-auto"><button className="btn btn-login">Login</button></Link>
        </nav>
    );
};
export default LandingNav;