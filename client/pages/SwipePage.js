import React, { useState, useEffect } from 'react';
import mockData from './mock-data.js';
import Card from '../components/Card.js';
import axios from "axios";

export default function SwipePage() {
  const [dogList, setDogList] = useState();
  const [listIndex, setListIndex] = useState(0);
  const [currentDog, setCurrentDog] = useState();

  useEffect(() => {
    async function getDogs() {
      const response = await axios('/api/dogs/dogs'); //Get potential likes
      // const response = mockData;
      const data = response.data;
      console.log('data', data)
      setDogList(data);
      setCurrentDog(data[0]);
    }
    getDogs();
  }, []);

  function goToNextDog() {
    setListIndex(listIndex + 1);
    setCurrentDog(dogList[listIndex + 1]);
  }
  return (
    <div >
      <header>
      <h3 className="m-3 text-3xl text-center">Swipe Page</h3>
      </header>
      <div id="swipe-page-content" className="flex justify-center">
      {currentDog ? <Card goToNextDog={goToNextDog} dog={currentDog} /> : <p>There are no more pups left to swipe on!</p>}
      </div>
    </div>
  );
}
