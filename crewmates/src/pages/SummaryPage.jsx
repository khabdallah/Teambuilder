// src/pages/SummaryPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      let { data: crewmatesData, error } = await supabase
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
          <li key={crew.id}>
            <Link to={`/detail/${crew.id}`}>{crew.name}</Link> (Attribute: {crew.attribute})
            {' - '}
            <Link to={`/edit/${crew.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryPage;
