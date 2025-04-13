// src/pages/CreatePage.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const navigate = useNavigate();

  // Local state to capture and display error messages
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug log for form submission
    console.log('Attempting to add crewmate with:', { name, attribute });

    // Input validation check (optional)
    if (!name || !attribute) {
      setErrorMsg('Please enter a name and select an attribute.');
      return;
    } else {
      setErrorMsg('');
    }

    // Inserting the new crewmate into the Supabase database
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, attribute }]);

    // Log the result to the console
    if (error) {
      console.error('Error creating crewmate:', error);
      setErrorMsg(`Error creating crewmate: ${error.message}`);
      // Optionally, you can alert the error message
      alert(`Error creating crewmate: ${error.message}`);
    } else {
      console.log('Crewmate added successfully!', data);
      // Reset form fields (optional)
      setName('');
      setAttribute('');
      // Navigate back to the summary page
      navigate('/');
    }
  };

  // Helper function for button styling based on selected attribute
  const getButtonStyle = (attr) => ({
    backgroundColor: attribute === attr ? '#d0ebff' : 'white',
    padding: '10px 15px',
    marginRight: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer'
  });

  return (
    <div>
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginTop: '15px' }}>
          <p>Select an attribute:</p>
          <button
            type="button"
            style={getButtonStyle('Speed')}
            onClick={() => {
              console.log('Attribute set to Speed');
              setAttribute('Speed');
            }}
          >
            Speed
          </button>
          <button
            type="button"
            style={getButtonStyle('Strength')}
            onClick={() => {
              console.log('Attribute set to Strength');
              setAttribute('Strength');
            }}
          >
            Strength
          </button>
          <button
            type="button"
            style={getButtonStyle('Stealth')}
            onClick={() => {
              console.log('Attribute set to Stealth');
              setAttribute('Stealth');
            }}
          >
            Stealth
          </button>
        </div>

        {/* Display the currently selected attribute for debugging */}
        {attribute && (
          <p style={{ marginTop: '10px' }}>
            Selected Attribute: <strong>{attribute}</strong>
          </p>
        )}

        {/* Error Message Display */}
        {errorMsg && (
          <p style={{ marginTop: '10px', color: 'red' }}>{errorMsg}</p>
        )}

        <div style={{ marginTop: '15px' }}>
          <button type="submit">Add Crewmate</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePage;
