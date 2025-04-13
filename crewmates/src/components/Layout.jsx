// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const layoutStyles = {
    display: 'flex'
  };

  const contentStyles = {
    marginLeft: '220px', // leave enough space for the sidebar plus some padding
    padding: '20px',
    width: '100%'
  };

  return (
    <div style={layoutStyles}>
      <Sidebar />
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
