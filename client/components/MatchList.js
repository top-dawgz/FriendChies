import React from 'react';
import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard.js';
import axios from 'axios';

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('/api/dogs/matches');
        setMatches(response.data);
        console.log(response.data);
      } catch (err) {
        console.log('There was an error fetching data: ', err);
      }
    };
    fetchDogs();
  }, []);

  return (
    <div>
      <h2>Match List</h2>
      {matches.map((dog) => (
        <MatchCard
          key={dog.match_id}
          name={dog.name}
          age={dog.age}
          breed={dog.breed}
          size={dog.size}
          sex={dog.sex}
          owner={dog.owner}
          calendarLink={dog.link}
        />
      ))}
    </div>
  );
};
