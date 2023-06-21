import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UserProfile({ dog }) {
  const [dogInfo, setDogInfo] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`/api/dogs/${dog}`);
        console.log('profile fetched for 2');
        console.log(response.data);
        setDogInfo(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getProfile();
  }, [dog]);

  return (
    <div>
      Single Profile Data
      {dogInfo.age}
      {dogInfo.breed}
      {dogInfo.id}
      {dogInfo.link}
      {dogInfo.name}
      {dogInfo.owner}
      {dogInfo.sex}
      {dogInfo.size}
    </div>
  );
}
