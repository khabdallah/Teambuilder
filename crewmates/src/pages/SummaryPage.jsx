// src/pages/SummaryPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data: crewmatesData, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching crewmates:', error);
      } else {
        setCrewmates(crewmatesData);
      }
    };

    fetchCrewmates();
  }, []);

  return (
    <div>
      <h2>Your Crewmates</h2>
      <Link to="/create">Create New Crewmate</Link>
      <ul>
        {crewmates.map((crew) => (
          <li key={crew.id} style={{ marginBottom: '15px' }}>
            <Link to={`/detail/${crew.id}`} style={{ fontWeight: 'bold' }}>
              {crew.name}
            </Link>
            <div>
              Attribute: {crew.attribute} | Role: {crew.role} | Ability: {crew.ability}
            </div>
            <div>
              <Link to={`/edit/${crew.id}`}>Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryPage;
