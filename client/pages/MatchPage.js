import React, { useEffect, useState } from 'react';
import MatchList from '../components/MatchList';
import UserProfile from '../components/UserProfile';
import "../style.css";

export default function MatchPage() {
  const [ currentDog, setCurrentDog ] = useState(-1);

  return (
    <div className="match-page">
      <MatchList setCurrentDog={ setCurrentDog } />
      <div>Match Chat</div>
      <UserProfile dog={ currentDog } />
    </div>
  );
}
