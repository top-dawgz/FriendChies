import React from 'react';
import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard.js';
import axios from 'axios';

export default function MatchList({ setCurrentDog }) {
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
    <div className='match-tab'>
      <h1>Matches</h1>
      <div className='match-list'>
        {matches.map((dog) => (
          <MatchCard
            key={dog.match_id}
            id={dog.match_id}
            name={dog.name}
            owner={dog.owner}
            calendarLink={dog.link}
            src={dog.img_src}
            setCurrentDog={setCurrentDog}
          />
        ))}
      </div>
    </div>
  );
}
