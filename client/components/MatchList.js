import React from 'react';
import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard.js';
import axios from 'axios';

export default function MatchList({ profileId, currentDog, setCurrentDog }) {
  const [matches, setMatches] = useState([]);
  // const profileId = 1;

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        if (profileId === -1) return;
        const response = await axios.get(`/api/dogs/matches/${profileId}`);
        const data = await response.data;
        setMatches(data);
        setCurrentDog(data[0].match_id)
      } catch (err) {
        console.log('There was an error fetching data: ', err);
      }
    };
    fetchDogs();
  }, [profileId]);

  async function removeMatch(matchId) {
    try {
      console.log('profileId', profileId, 'matchId', matchId)
      const response = await axios.put(`/api/dogs/matches/${profileId}`, { matchId });
      const data = await response.data;
      setMatches(data);
      if (matchId === currentDog) setCurrentDog(data[0].match_id);
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className='match-tab'>
      <h1 className="text-2xl text-center m-3">Matches</h1>
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
            removeMatch={removeMatch}
          />
        ))}
      </div>
    </div>
  );
}
