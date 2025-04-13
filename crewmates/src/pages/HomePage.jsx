// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Welcome to the Crew Customizer!</h1>
      <p>
        Build your ultimate team of crewmates to dominate the game you love.
        With our app, you can create custom crewmates with unique attributes, view details, and manage your team easily.
      </p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/create">
          <button style={{ padding: '10px 20px', marginRight: '15px' }}>
            Create a New Crewmate
          </button>
        </Link>
        <Link to="/crew">
          <button style={{ padding: '10px 20px' }}>
            View Your Team
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
