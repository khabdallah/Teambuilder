// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const sidebarStyles = {
    width: '200px',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    boxSizing: 'border-box'
  };

  const linkStyles = {
    display: 'block',
    marginBottom: '10px',
    textDecoration: 'none',
    color: '#333'
  };

  return (
    <div style={sidebarStyles}>
      <h3>Navigation</h3>
      <nav>
        <Link style={linkStyles} to="/">
          Home
        </Link>
        <Link style={linkStyles} to="/create">
          Create
        </Link>
        <Link style={linkStyles} to="/crew">
          Summary
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
