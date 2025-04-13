// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import '../App.css'; // Import the CSS file

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
