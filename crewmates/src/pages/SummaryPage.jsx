// src/pages/SummaryPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);

  // Mapping of attribute to a specific image URL for card display.
  const attributeImageMap = {
    'Speed': 'https://t3.ftcdn.net/jpg/05/97/56/34/360_F_597563407_eNGgsSgHp2z2ruz9oWlrQ6hGCWjIuH0p.jpg',
    'Strength': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWl16zqv9jW2FXR7oM_VKmRWPAjRvSCAoc2w&s',
    'Stealth': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDw0SEg0NFRIVDQ0VEhIVDQ8NDxUPFRUXFhUVFRUYHSkgGBslHRUVITEhJSkrLi4vGCAzODM4NygtOisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcEBQgDAgH/xABMEAABAwICBgUEDQkIAwEAAAABAAIDBBEFIQYHEjFBURMiYXGBMlKRoRQXI0JUYnJzkpOxssElNEN0o7PCw9MVJCY1gqLR0mNkpET/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AvBERAREQEREBERAREQEREFf6ydYDsPc2np2sdUFgc9zhtMiYfJy9842vbgLE71WQ0/xm5k9nzWvn7jD0fdbYsvjT5wdjNf0hIHsprXHiI2tY2/0QF0RS0sLIWRRsjEQjDWsAHR9HbIW3EWQV1oDrNNTKymrGxtleQIpm9Vj38GPb71x4EZE5WGV7NXNGnNPFTYnXMpuqyOcGPZ3Mk2Wuc1vLZeXADha3BdKxE7Lb+VYX77ZoPpERAREQEREBERAREQEREDPsRM0QEREBERAREQEREBERAREQVTre0LL9vEIBdwYPZTBvLWiwlHaAACOQB4G9e0emGJwwiCOvnbEG2a0bBLW8mvI2mjlY5cF0pUMBY9pAILHAg5ggjO65OAsgsDVZoa6smbVzA+x4pQWg75p2m9u1rTYk8TlzV6qMasmgYRh9h+icfEvcT61J0BERAREQEREBERAREQEREC/YiXRAREQEREBERAREQEREBERB8yeS7uP2Lk1dZSeS75JXJqDo7Vp/lGH/ADJ++5SZRrVt/lGHfMfxOUlQEREBERAREQEREBERARa7BsbpqwTGCXbEU8kUnVc20jN+8ZjkdxWxQLol0QEREBERAREQEREBERAREQfMvkuPxT9i5MuupdIa0U9HVzE2EdNM7xDTYd5NguWWiwA7Ag6P1Zm+EYf8y4eh7gpOoRqdrRLhMTL5wzTxuHe7pG+p4U3QEREBERAREQEREBERBrcFwKmo+n6CPYE075ZOs515Hb7XOQ7Bktkovq7rZaiknmkle/bxCvLNo32YhKWsY34otkpQgWRLIgKPawMTkpcMrJonlsjWMDHAAlrnyNYHAHK42rqQqE64n2wiftmpR+1afwQZWr7TFmJwWdstqYwBNGMgeAkYPNPqOXImWLlTDcQmppo5oZHMkYbtcPWCOIO4g71emg+sSnrwyKYshqshsE2jkPOInifNOffvQTdERAREQFo9LtJ4cMgjmmjneHzNjAiaxztotc+52nAAWYePJbxajSrAIsQpZKeRxbctcx4FyyRvkuA48iOIJQQ4a5cP40eJfV0p/nIdcuH/AATEvq6UD98ozJqcxAE7NVQkXyJdMwkdo2Db0lfPtO4j8IoPrJ/6aDw0+1jHEYRTwwvihLmukL3NMkmybtaQ24DQQDvNyB4wJWJ7TuI/CKD6yf8App7TuI/CKD6yf+mg0egWmL8LlkPRmSGQN6SMO2XAtvsvZfK+ZFuOXIKxPbloPgeI/Qpf6qi/tO4j8IoPrJ/6ae07iPwig+sn/poJR7cuH/A8R+hS/wBVSLQ7TWnxQ1AhhqWGIRF3StiaD0m1bZ2Hu8w77cFWw1O4j8JoPpzn+WrM0G0TjwundGH9JK9wdLJs7AJAsA0XNmgfaTxQSNERAREQERaDSvS2kw6O8z7yEExwNIMr/D3rfjHJBl6R47BQU8k8zuqMmtFtuSQ+Sxo4k+rMnIKLaB6VVFVQYrWVDm2jqKksaAAyOJlPG/YB4gXJud9yqh0q0mqcRn6WYgAXEUTSejjaeA5k2F3cbcgAJngcvQaKYi4b555mAczIY4CPQD6EE+1XUpiwbDm8XROkJ4npXuk/iUqWJhFIIKamhH6OCFn0Whv4LLQLIlu1EBQfXIL4RL2VFN98D8VOFEda8O3g9bb3vsd3g2ZhPqug55X4Qv1EE10Y1mV9GGskIqYRYbMjiJWj4suZ+kD4K0dH9Y2G1ZYzpjDK5zWiOYdGS9xsGteOq4kmwF7nkueVn6PvDa2gJ3Cuoye4TMJQdSotJpmaoUFU+llcyeNnSMIYx5IjIc5my4EG7Q4eKrHBdcVUywqaaKVvnxkwSW52N2uP0UF0oozo/p5htaWtZUBkp3RSjoZL8m36rz8klSZAUX1k4tPSYbNNBJsSCSnAdstfk6RrTk4EbipQoVri/wAnqPnqX961BVvtlYx8N/8Anp/+iuPQrFJ6jCaeeV+1K6Kcufstbcte8NyAtuAXN66I1eD8iUY/9ab1ueUFRM1l4zYf33gP/wA9P/0Vo6pseqq6kqZKmXbc2rLGnYYyzejjdbqgXzcVQMe5vcFeGottsOqTzxGU/sYB+CCxkREBFpsd0qoKH84qo2utlGLyTfVtu63bayz8Krm1MEM7WvDJI2vYHt2X7DhdpIvlcWKDKUc0h03w6hLmy1DXSD9DH7rLfk4DJv8AqIUL1radvY51DSyFrgLVEzTZzb/omEbj5xG7dvvaoUFiaR62ayfaZSsbTx+ebS1BHf5LPAHvVfzzPe9z3vc57jdz3OL3uPMuOZK+EQFa1BS7VForQC956t1XILX9xjc6Yg8gQ8W7lVUcTnuaxou5zmtaObnGwHpIV66I0rZcVq5G5w0FJT0EJ4dI0bUx7wcvFBPkRECx5omfYiAtXpTRGooa6Eb30k7W/LLDs+uy2iIOSmm4B7F+ra6WYb7Fr62C2TKh+z82/rs/2uatUgtfVto5huJ4cWz0zTNDPIwyMc6GYtd12EuaRtDrEDauOqvbEtTTb3psQe3O4EsQkIPDrMLfsUW1TaQCjxAMe60VSGxOO4CUH3Jx8S5v+tdAIPiEO2G7ZBdst2rDql1s7DldUDrD0JmoZ5JYonOpHuLmOa0uEV8zG+3kgcDutbiugUQclZEcCPSFLdGNYNfQlrekM8I/QyuLrD4knlN7sx2K6Ma0Kw2s2jLRxB5/SxjoZb8y5ttrxuqw0p1UVMAdJSPNRGLkxkBtSB2Wyk8LHkCgs3RTTOjxJtonlsoF3wPs2UcyOD29o8bLX63YnOweq2Wk7L6dzrC9mNlaXHuAzPYqAikfG8Oa57JGPyILo5GPHbvaQrh0B1ltn2KWuLRI7qsnIDY5L5bMg3Ncee49htcKbXRegI/ItF+qO9e0ofp/qwHXqMPZY5mSlG4ji6HkfibuXIzTQdpbg1CCCD7CFwQQQbHeDuQc3R7h3BXrqQFsMl7a6b93EPwVbaAaETYm4OJdHTMID5bdZzvMjvkXczuHqVk6T6U0eB07KOkiYZgzqRXJZHtZ9JMb3JJN7bz2DNBLNIdIqWgi6SolDb+SwdaV55MZvPfuHEqm9KtaFbVFzKcmmhzHVINQ4fGk973Nt3lQ7FMSnqpXzTyukkdvc47hwDRua0chkpNofq8rMQDZHe4U5zEr2kveP/GzK4+MbDldBF6KjfUzxRN2jJNKxl83OLnmxcTxte5PYr80/wBIn0NOyClikdVSsLYGRxOl6ONtgZC0A7rgAcT2ArK0W0GocPIfHG582zbppHbcljv2RkGX7ApMg50oNXuL1Bv7De0Ekl80jYjc5kuBO2SedlKcL1NTGxqK6Jo4thjdKfB77fdVxIgrXGtCsKwvD6yo6EyysgcGPnf0vuz+pHZmTAdpzc9m6pQK2Nd+PgmChY7ySJZ7HcbERsPgS63ySqoQbTRuURT+yCLinYZWttfanGUDfrCw9zSugdBcFNFQQRPzmdeWdxN3Gok6z7njbJt/iqptUmjhq6rpnt/u9PIx5BGT6kA9E3t2bl3i3mr4QEREDNEv2IgIiIKj114D7rSVYya+0EzvetdmY3u7M3AnsCqmaJzHPY5pDmuc1zTvDmmxB8QuosfwiOtpZ6eXyZGEXtctdva4docAfBUbimjs08c42D7PogI6uIAl89M0ARVMY3uIbsg8SA07zmEMIV8ar9NW1sTaed49lRtyJOc0Y9+Obh74ePE2ocL0gmfG9j2Pc17XBzXNJa5rhuII3FB1iiqnRHWywhsWINLXCwFQxhLHfOMGbT2tuOwKy8OxSnqW7UFRDK3nHI2TwNjkUGWiL4lma0dZ7WjmXBo9aCFawtAYq9jpoWtZVtFw7JrJgPeSdvJ3DjkqFnhcxz2PYWua5zXtcLODgbEEc11MMWpbhoqqbava3Tx3v3XVZa6NFRYYhE3MbDKkAbxuZL3jJp728kH5qs0+JMdDVvJJs2nmcbknhFIefmnjuOdr20R61yWrZwLWw2PDy2dsj6yNhbGdk7E2XUc93vT53O1xvyDeadaVw4PTR0lIyNs5jtGxoGxBF57hxJzsDvNye2jJ5nPc973uc5zi5znOLnFxzJJO8r1rqySeWSaV5dJI8ue47y4/YNwA4AAKZ6q9HYZ5zVVLo208Dhsh7mtbJUbwDfeGizj2lvag3+rbVwCI6uujvezoadwytwfKDvPJh8c8hbYCwGY3RuNhWUh7BURE/asuKdj/ACXscOxwd9iD0RF41dVHE0vkljjYBm972xsA7Scgg9lHtNtK4cMpi91nSuBEEV7F7+Z5NG8n8SFHNKNa1JA1zKQColsQH5tpmnmXb39zcjzCpvF8Unq5nzTyl8jt5OQDRua0bmtF9wQeNbVyTyySyPLpJHuc9x4uP2Ds4BZWAYNNXVEdPCLvdmSQdljB5T3dguO+4G8r8wPBqitnbDBGXPO/gxjeL3u960c/AZroPQrROHDINhnXmfYzTEWc9w4DzWC5sPxJQbHR7BoaGmip4h1WNzJttPec3Pd2k5rYoiAiIgXRLogIiICimmWj80j4q6jIbXQA7IOTJ4ffQSd+du/hvErRBUdZovRY3HJUUZFNWtJFTTPBa0TcRI212EkHrgWOdxe9q5xvAKyids1NNJHnYPI2onfJkHVPde6vrSXRETyiqpZjTVzR1Zmi7JB5kzNz25DPu32stZFps6nIp8YozA49UTtYZ6GXuIuW35G9uNkFDIwkEOBIcNxBs4dxC6Bl0HwOub0kUMFjukppjGzP4rDsX7wtPU6m6Mn3OsrG9juhkH3QUFPnEai1vZNTbl08tvtWK8bRu7M8z1j6SrfdqXZwxJ/jTNP8a+2amIffYhMe6BjftJQU5sjkPQro1TY37OpKqgqT0mxHZu0bl1K8FpaTx2Tlfk5vJZVNqfw5vlz1r+wyRMH+1l/WpLo9obh9A8yU8BbIWFheZppXFhIJFnOIGbRuHBBz/pRgUuH1UtPID1STG8iwkhPkvH2HkQQtTcc11ZW4fBMG9NBDIGm7ekiZIGnmNoZLH/sOiI/MqO36tCRb0IOW1+Fo5D0Lpt+iuFy5nDsPd2ilgv6QFg1GrvB5N+Hxj5Ek0P3HBBznsjkF+NYAbgAHmBYq/ZtVGEu8mOpZ8mpe7791hSancPPk1NcP9cLv5aCmWV84yFROByE0gH2rxmlc8gve5xG4ucXkdxKugamqG/55Xemn/wCizabVLhTPK9lSdjqjYH7MNKCiOQ4k2A4k9immi2raurC10jHU8GV3yNtK4fEiOfi6w71dWEaM0FHb2PRwMdby9jalt2yOu4+lbZBqtHNHqXD4RFTx2G97z1pJHec93E+ocAtqiICIiAiIgXREQEREBERAXnU07JWuY+Nj2EWc1zGvYRyIORXoiCF12rTD3PL6d1TSSefTTuiH0TcAdgsvAaK43EbQaRPc0bmz0kczvF7i4lTtEEIbh2koy/tLDT2mmdf0Bq9P7Cx5/l4/FGOPRYbC4+BeclM0QfLAQBc3NgCbAEnnYKMazcRnpsLqJYJXRyB9OA8BpIa6VrXAXBGYJClKheuA/kep+dpf3zEFFVuKVM5vNVVMnzk8kg8A45LoLQw/kSi7MOb6mFc5LojRF35BpTyw53qYUHO9FK+MNMb3sIAsWOdGR4tV56mcTqKmjqenqJZSyq2WGR5kcGdGw22jmcyd5O9UUzcO4K6tRP5nW/rv8qNBZiIiAiIgIiICIiAiIgIiIFkSyICIiAiIgIiICIiAiIgKE64j+SJ+2al/etU2UG1zH8kv/Wab7yChF0Doo/8Aw7EeWHVHqD/+Fz8r30Wl/wAMX5YfiHqMo/BBQ7dw7grp1E/mdb+u/wAqNUsFdOon8zrf13+VGgsxERAREQEREBERAREQEREC3aUS3aiAiIgIiICIiAiIgIiICg2uUXwmTsqKb79vxU5UO1ux7WD1fxX0p/bMH4oOfFdGjc9tE5z5tHiY/wB8v/KpdWro9Uf4Trx5pqmfTc0/xoKpV06ifzOt/Xf5UapdXTqJH9yrT/7xHiIYj+KCy0REBERAREQEREBERAREQM0TNEBERAREQEREBERAREQFo9OKQzYZiMYFyaSYtHN7W7TR6Whbxfjmgggi4III7Cg5LCmuEYiG6O4tDtDaNfSWF89mQxn7IZPQo1j+GGkq6qnP6KZ7R2s3sPi0tPisEPNiLmxLSRfIltwCRzG070lB+K/dTtH0WExOIsZZ55PDa6MH0RhUNTU75Xxxsbd73sYwc3uIa0ekhdS4RQNpqengb5MUMbB27LQL+NroMtERAREQEREBERAREQEREC/YiX70QEREBERAREQEREBERAREQVRrs0buI6+NubQ2Oot5l/c5D3E7JPa3kqiXV9VTMljkjkYHMexzXtIuHNcLEFURimrWsZiLaWJjnQSOLo6gguYyAHrdIfPbe1vfZW3mwZ+pjRwzVLqyRvucF2xXGTqhwzI+S0+lw5FXasLBcKipKeGCJto42WHMneXOPFxNye9ZqAiIgIiICIiAiIgIiICIiBtIl0QOPgnFEQDwRyIgOQoiAECIgBBxREAbynHwREDihREAo5EQCiIgBGoiAOPeg4oiBxTiiIB4I78URAchREHyiIg//9k=',
    'Magic': 'data:image/png;base64,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'
    // You can add more attribute mappings if needed.
  };

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching crewmates:", error);
      } else {
        setCrewmates(data);
      }
    };

    fetchCrewmates();
  }, []);

  return (
    <div>
      <h2>Your Party Members</h2>
      <Link 
        to="/create"
        style={{ 
          marginBottom: '20px', 
          display: 'inline-block', 
          backgroundColor: '#333',
          border: '2px solid #c39430',
          color: '#f8f8f8',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Create New Party Member
      </Link>
      
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // Forces exactly 3 columns
          gap: '20px'
        }}
      >
        {crewmates.map((crew) => (
          <div 
            key={crew.id}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '20px',
              borderRadius: '8px',
              color: '#f8f8f8',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Display the image based on the selected attribute, resized to be smaller and fit the card */}
            <img
              src={attributeImageMap[crew.attribute] || 'https://via.placeholder.com/300x200?text=Default'}
              alt={crew.attribute}
              style={{ 
                width: '100%', 
                height: '150px', 
                objectFit: 'cover', 
                borderRadius: '4px', 
                marginBottom: '10px' 
              }}
            />
            <h3>{crew.name}</h3>
            <p><strong>Attribute:</strong> {crew.attribute}</p>
            <p><strong>Role:</strong> {crew.role}</p>
            <p><strong>Ability:</strong> {crew.ability}</p>
            <div style={{ marginTop: '10px' }}>
              <Link 
                to={`/detail/${crew.id}`} 
                style={{ color: '#c39430', textDecoration: 'none', marginRight: '10px' }}
              >
                View Details
              </Link>
              <Link 
                to={`/edit/${crew.id}`} 
                style={{ color: '#c39430', textDecoration: 'none' }}
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryPage;
