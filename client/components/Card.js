import axios from 'axios';
import React from 'react';
import paw from '../assets/paw.png';
import poop from '../assets/poop.png';

export default function Card(props) {
  const { dog } = props;

  // like function
  async function handleLike() {
    await handleSwipe(true);
  }

  async function handleDislike() {
    await handleSwipe(false);
  }

  async function handleSwipe(liked) {
    try {
      props.goToNextDog();
      const body = {
        swiper_id: 1, //TODO: Get user info from logged in user
        swiped_id: props.dog.id,
        liked: liked,
      };
      const response = await axios.post('/api/dogs/swipe', body);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="card w-1/2 pt-2 pb-4 bg-gray-100" >
      <div className="text-center"id="data">
        <h2 className="text-xl m-1 text-2xl">{dog.name}</h2>
        {/* Carousel to swipe through pictures? */}
        {/* <img className="swipeCardIm" src={link} /> */}
        <ul className="removeBullets mb-3">
          <li>
            <label className="cardLabel" id="owner">
              <strong>Owner Name: </strong>
              {dog.owner}
            </label>
          </li>

          <li>
            <label className="cardLabel" id="breed">
              <strong>Breed: </strong>
              {dog.breed}
            </label>
          </li>

          <li>
            <label className="cardLabel" id="size">
              <strong>Size: </strong>
              {dog.size}
            </label>
          </li>

          <li>
            <label className="cardLabel" id="breed">
              <strong>Gender: </strong>
              {dog.sex}
            </label>
          </li>

          <li>
            <label className="cardLabel" id="breed">
              <strong>age: </strong>
              {dog.age}
            </label>
          </li>
        </ul>
      </div>
      {/* Like Button */}
      <div className="flex justify-center">
        <div
          className="active:bg-blue-500 hover:bg-blue-300 mr-2 p-1.5 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-sky-500"
          id="like"
          onClick={handleDislike}
        >
          <img src={paw} />
        </div>
        {/* Dislike Button */}
        <div
          id="dislike-button"
          className="active:bg-blue-500 hover:bg-blue-300 mr-2 p-1.5 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-sky-500"
          onClick={handleLike}
        >
          <img src={poop} />
        </div>
      </div>
    </div>
  );
}
