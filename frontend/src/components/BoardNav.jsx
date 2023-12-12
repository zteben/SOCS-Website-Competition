import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingNav.css';

const SelectNav = () => {
  useEffect(() => {
    function updateLogo() {
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const logo = document.getElementById('navbar-logo');

      if (logo) {
        if (isDarkMode) {
          logo.src = 'images/bird_white.png';
        } else {
          logo.src = 'images/bird.png';
        }
      }
    }
    updateLogo();
    // Listen for changes in color scheme and update the logo accordingly
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateLogo);
    // Clean up the event listener on component unmount
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateLogo);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 204) {
        localStorage.removeItem('accessToken');
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="LandingNav navbar navbar-expand-lg">
      <Link to="/select" className="d-flex align-items-center no-deco offset">
        <img
          id="navbar-logo"
          src="images/bird.png"
          alt="McGill Logo"
          width="40"
          height="40"
        />
        <div className="navbar-brand brand-logo">McComms</div>
      </Link>

      <Link to="/" className="ml-auto">
        <button className="btn btn-login" onClick={handleLogout}>
          Logout
        </button>
      </Link>
    </nav>
  );
};
export default SelectNav;
