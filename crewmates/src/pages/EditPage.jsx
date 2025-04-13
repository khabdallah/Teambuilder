// src/pages/EditPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

function EditPage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const [role, setRole] = useState('');
  const [ability, setAbility] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // Helper to compute the extra info description.
  const computeExtraInfo = (attribute, role, ability) => {
    return `This crewmate is a ${role} known for their ${attribute.toLowerCase()} skills and a remarkable ability to ${ability.toLowerCase()}.`;
  };

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching crewmate:', error);
      } else {
        setCrewmate(data);
        setName(data.name);
        setAttribute(data.attribute);
        setRole(data.role);
        setAbility(data.ability);
      }
    };

    fetchCrewmate();
  }, [id]);

  const getButtonStyle = (selectedValue, option) => ({
    backgroundColor: selectedValue === option ? '#d0ebff' : 'white',
    padding: '10px 15px',
    marginRight: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer'
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !attribute || !role || !ability) {
      setErrorMsg('Please complete all fields.');
      return;
    }
    setErrorMsg('');

    const extra_info = computeExtraInfo(attribute, role, ability);

    const { error } = await supabase
      .from('crewmates')
      .update({ name, attribute, role, ability, extra_info })
      .eq('id', id);

    if (error) {
      console.error('Error updating crewmate:', error);
      setErrorMsg(`Error updating crewmate: ${error.message}`);
    } else {
      navigate('/crew');
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting crewmate:', error);
      setErrorMsg(`Error deleting crewmate: ${error.message}`);
    } else {
      navigate('/crew');
    }
  };

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Crewmate</h2>
      <form onSubmit={handleUpdate}>
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
          <p>Select a Main Stat:</p>
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
          <button
            type="button"
            style={getButtonStyle(attribute, 'Magic')}
            onClick={() => setAttribute('Magic')}
          >
            Magic
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
          <button
            type="button"
            style={getButtonStyle(role, 'Tank')}
            onClick={() => setRole('Tank')}
          >
            Tank
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

        {errorMsg && (
          <p style={{ marginTop: '10px', color: 'red' }}>{errorMsg}</p>
        )}

        <div style={{ marginTop: '15px' }}>
          <button type="submit">Update Crewmate</button>
        </div>
      </form>
      <br />
      <button onClick={handleDelete} style={{ marginTop: '10px' }}>
        Delete Crewmate
      </button>
    </div>
  );
}

export default EditPage;
