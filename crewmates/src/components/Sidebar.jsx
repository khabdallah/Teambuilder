// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure CSS is imported if not imported globally

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/crew">Summary</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
