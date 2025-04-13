// src/pages/EditPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

function EditPage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewmate = async () => {
      let { data, error } = await supabase
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
      }
    };
    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('crewmates')
      .update({ name, attribute })
      .eq('id', id);
    if (error) {
      console.error('Error updating crewmate:', error);
    } else {
      navigate('/');
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      navigate('/');
    }
  };

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Crewmate</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div>
          <p>Select an attribute:</p>
          <button type="button" onClick={() => setAttribute('Speed')}>
            Speed
          </button>
          <button type="button" onClick={() => setAttribute('Strength')}>
            Strength
          </button>
          <button type="button" onClick={() => setAttribute('Stealth')}>
            Stealth
          </button>
        </div>
        <button type="submit">Update Crewmate</button>
      </form>
      <br />
      <button onClick={handleDelete}>Delete Crewmate</button>
    </div>
  );
}

export default EditPage;
