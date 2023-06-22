import React, { useEffect, useState } from 'react';
import MatchList from '../components/MatchList';
import UserProfile from '../components/UserProfile';
import "../style.css";
import axios from 'axios';
import MatchChat from '../components/MatchChat';

export default function MatchPage() {
  const [ currentDog, setCurrentDog ] = useState(-1);
  const [ profileId, setProfileId ] = useState(-1);

  // get the users profiles and set profileId to the first one
  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get('/api/dogs/profiles');
      const profileIdData = response.data.id;
      setProfileId(profileIdData);
    }
    getProfile();
  },[]);

  return (
    <div className="match-page">
      <MatchList currentDog={ currentDog } setCurrentDog={ setCurrentDog } profileId={profileId} />
      <MatchChat profileId={profileId} />
      <UserProfile dog={ currentDog } />
    </div>
  );
}
