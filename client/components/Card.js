import axios from "axios";
import React from "react";
export default function Card(props) {
  const { dog } = props;

  // like function
  async function handleLike() {
    await handleSwipe(true);
  }

  async function handleDislike(){
    await handleSwipe(false);
  }

  async function handleSwipe(liked) {
    try {
      props.goToNextDog();
      const body = {
        swiper_id: 1, //TODO: Get user info from logged in user
        swiped_id: props.dog.id,
        liked: liked
      }
      const response = await axios.post('/api/dogs/swipe', body);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="card">
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
      <button className="buttonCard" id="dislike" onClick={handleDislike}>
        No Paw
      </button>
      {/* Dislike Button */}
      <button className="buttonCard" id="like" onClick={handleLike}>
        Paw
      </button>
    </div>
  );
}
