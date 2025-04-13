// src/pages/DetailPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, Link } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      let { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching crewmate details:', error);
      } else {
        setCrewmate(data);
      }
    };
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p>Attribute: {crewmate.attribute}</p>
      <p>Extra Info: {crewmate.extra_info || 'No extra information available.'}</p>
      <Link to={`/edit/${crewmate.id}`}>Edit Crewmate</Link>
      <br />
      <Link to="/">Back to Crewmate List</Link>
    </div>
  );
}

export default DetailPage;
