import axios from 'axios';
import React from 'react';
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
    <div className="card w-4/6">
      <h3 className="text-3xl">{dog.name}</h3>
      {/* Carousel to swipe through pictures? */}
      {/* <img className="swipeCardIm" src={link} /> */}
      <ul className="removeBullets">
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

      {/* Like Button */}
      <div className="flex justify-center">
        <div className="w-8 h-8 bg-[url('./assets/paw.png')]" id="dislike" onClick={handleDislike}>
        </div>
        <div id="dislike-button">
          </div>
        {/* Dislike Button */}
        <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 bg-blue-300 active:bg-blue-600 dark:md:hover:bg-fuchsia-200 p-1 rounded border-solid border-2 border-sky-500 buttonCard m-1 bg-poop" id="like" onClick={handleLike}>
          
        </button>
      </div>
    </div>
  );
}
