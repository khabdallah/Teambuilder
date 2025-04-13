// src/pages/CreatePage.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const [role, setRole] = useState('');
  const [ability, setAbility] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // This helper function builds a descriptive message based on the user's selections.
  const computeExtraInfo = (attribute, role, ability) => {
    return `This crewmate is a ${role} known for their ${attribute.toLowerCase()} skills and a remarkable ability to ${ability.toLowerCase()}.`;
  };

  // Helper function to style the buttons based on selection
  const getButtonStyle = (selectedValue, option) => ({
    backgroundColor: selectedValue === option ? '#d0ebff' : 'white',
    padding: '10px 15px',
    marginRight: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are provided.
    if (!name || !attribute || !role || !ability) {
      setErrorMsg('Please complete all fields.');
      return;
    }
    setErrorMsg('');

    // Compute the extra info message
    const extra_info = computeExtraInfo(attribute, role, ability);

    // Insert the new crewmate with extra_info into Supabase
    const { error } = await supabase
      .from('crewmates')
      .insert([{ name, attribute, role, ability, extra_info }]);

    if (error) {
      console.error('Error creating crewmate:', error);
      setErrorMsg(`Error creating crewmate: ${error.message}`);
    } else {
      // Optionally reset fields
      setName('');
      setAttribute('');
      setRole('');
      setAbility('');
      navigate('/crew');
    }
  };

  return (
    <div>
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
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

        {/* Attribute Selection */}
        <div style={{ marginTop: '15px' }}>
          <p>Select an Attribute:</p>
          <button
            type="button"
            style={getButtonStyle(attribute, 'Speed')}
            onClick={() => setAttribute('Speed')}
          >
            Speed
          </button>
          <button
            type="button"
            style={getButtonStyle(attribute, 'Strength')}
            onClick={() => setAttribute('Strength')}
          >
            Strength
          </button>
          <button
            type="button"
            style={getButtonStyle(attribute, 'Stealth')}
            onClick={() => setAttribute('Stealth')}
          >
            Stealth
          </button>
        </div>

        {/* Role Selection */}
        <div style={{ marginTop: '15px' }}>
          <p>Select a Role:</p>
          <button
            type="button"
            style={getButtonStyle(role, 'Leader')}
            onClick={() => setRole('Leader')}
          >
            Leader
          </button>
          <button
            type="button"
            style={getButtonStyle(role, 'Support')}
            onClick={() => setRole('Support')}
          >
            Support
          </button>
          <button
            type="button"
            style={getButtonStyle(role, 'Scout')}
            onClick={() => setRole('Scout')}
          >
            Scout
          </button>
        </div>

        {/* Ability Selection */}
        <div style={{ marginTop: '15px' }}>
          <p>Select an Ability:</p>
          <button
            type="button"
            style={getButtonStyle(ability, 'Heal')}
            onClick={() => setAbility('Heal')}
          >
            Heal
          </button>
          <button
            type="button"
            style={getButtonStyle(ability, 'Damage')}
            onClick={() => setAbility('Damage')}
          >
            Damage
          </button>
          <button
            type="button"
            style={getButtonStyle(ability, 'Defend')}
            onClick={() => setAbility('Defend')}
          >
            Defend
          </button>
        </div>

        {/* Display selected attribute info (for user feedback) */}
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
