import React, { useState, useEffect } from "react";
import mockData from "./mock-data.js";
import Card from "../components/Card.js";
import axios from "axios";

export default function SwipePage() {
  const [dogList, setDogList] = useState();
  const [listIndex, setListIndex] = useState(0);
  const [currentDog, setCurrentDog] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getDogs() {
      const response = await axios("/api/dogs/dogs"); //Get potential likes
      const data = response.data;
      setDogList(data);
      setCurrentDog(data[0]);
    }
    getDogs();
  }, []);

  function goToNextDog() {
    setListIndex(listIndex + 1);
    setCurrentDog(dogList[listIndex + 1]);
  }

  function alertMatch() {
    setMessage("You have a new match!");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <div>
      <header>
        <h3 className="m-3 text-3xl text-center">Find Dogs</h3>
      </header>
      <div id="swipe-page-content" className="flex justify-center">
        {currentDog ? (
          <Card
            goToNextDog={goToNextDog}
            dog={currentDog}
            alertMatch={alertMatch}
          />
        ) : (
          <p>There are no more pups left to swipe on!</p>
        )}
      </div>
      {message ? (
        <p className="m-4 text-center font-bold text-amber-600">{message}</p>
      ) : null}
    </div>
  );
}
