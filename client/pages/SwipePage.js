import React, { useState, useEffect } from 'react';
import mockData from './mock-data.js';
import Card from '../components/Card.js';

export default function SwipePage() {
  const [dogList, setDogList] = useState();
  const [listIndex, setListIndex] = useState(0);
  const [currentDog, setCurrentDog] = useState();

  useEffect(() => {
    async function getDogs() {
      //const response = await axios(''); //Get potential likes
      const response = mockData;
      console.log('response', response);
      setDogList(response);
      setCurrentDog(response[0]);
    }
    getDogs();
  }, []);

  function goToNextDog() {
    setListIndex(listIndex + 1);
    setCurrentDog(dogList[listIndex + 1]);
  }
  console.log('currentDog', currentDog)
  return (
    <div>
      <h3>Swipe Page</h3>
      {currentDog ? <Card goToNextDog={goToNextDog} dog={currentDog} /> : null}
      <button onClick={goToNextDog}>Next</button>
    </div>
  );
}
