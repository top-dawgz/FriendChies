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
        swiped_id: props.dog.id,
        liked: liked,
      };
      const response = await axios.post('/api/dogs/swipe', body);
      if (response.data === "A match was found!") {
        props.alertMatch();
      }
    } catch (err) {
      console.log(err);
    }
  }

  //TODO NEXT: test matches

  return (
    <div className="card w-1/2 pt-2 pb-4 bg-indigo-50 border-indigo-600 border-2">
      <div className="text-center" id="data">
        <h2 className="text-xl m-2 text-4xl">{dog.name}</h2>
        {/* Carousel to swipe through pictures? */}
        {/* <img className="swipeCardIm" src={link} /> */}
        <div className="flex justify-around" id="card-content">
          <div id="image-container" className="w-1/2 m-4 rounded">
            <img
              className="max-w-full max-h-full rounded border-2 border-indigo-500"
              src={dog.img_src}
            />
          </div>
          <div className="w-1/2 m-4">
            <ul className="removeBullets mb-3 text-left">
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
                  <strong>Age: </strong>
                  {dog.age}
                </label>
              </li>
              <li>
                <label className="cardLabel" id="bio">
                  <strong>Bio: </strong>
                  {dog.about}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            id="dislike-button"
            className="flex items-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 p-1.5 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-indigo-600"
            onClick={handleDislike}
          >
            <img src={poop} />
          </div>
          <div
            className="flex items-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 p-1.5 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-indigo-600"
            id="like"
            onClick={handleLike}
          >
            <img src={paw} />
          </div>
        </div>
      </div>
    </div>
  );
}
