import React, { useEffect, useState } from "react";
import MatchList from "../components/MatchList";
import UserProfile from "../components/UserProfile";
import "../style.css";
import axios from "axios";
import MatchChat from "../components/MatchChat";

export default function MatchPage() {
  const [currentDog, setCurrentDog] = useState(-1);
  const [profileId, setProfileId] = useState(-1);

  // get the users profiles and set profileId to the first one
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get("/api/dogs/profiles");
        const profileIdData = response.data.id;
        setProfileId(profileIdData);
      } catch (err) {
        console.error(err);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="match-page">
      {profileId === -1 ? (
        <div>No matches</div>
      ) : (
        <MatchList
          currentDog={currentDog}
          setCurrentDog={setCurrentDog}
          profileId={profileId}
        />
      )}
      {currentDog === -1 ? (
        <div className="text-2xl text-center m-3">No profile </div>
      ) : (
        <MatchChat profileId={profileId} matchId={currentDog} />
      )}
      {currentDog === -1 ? (
        <div>No profile </div>
      ) : (
        <UserProfile dog={currentDog} />
      )}
    </div>
  );
}
