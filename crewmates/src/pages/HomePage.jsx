// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Welcome to the RPG Party Customizer!</h1>
      <p>
        Build your ultimate team of misfits to dominate the fantasy world of your design.
        With our app, you can create custom party members with unique attributes, view details, and manage your team easily.
      </p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/create">
          <button style={{ padding: '10px 20px', marginRight: '15px' }}>
            Create a New Party Member
          </button>
        </Link>
        <Link to="/crew">
          <button style={{ padding: '10px 20px' }}>
            View Your Party
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
