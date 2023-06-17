import React from "react";
export default function Card() {
  //const { name, owner, breed, size, gender, age } = props;
  const name = "Pepper";
  const owner = "Francis";
  const breed = "French Bulldog";
  const size = "small";
  const age = "1 year";
  const gender = "Female";
  const link =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn3.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcQP_2RN46F8vBMkdRDOZyM2ot9t6cyCICZuaVChqk-XYJJWcjlVzmXwCV9AeZias0QIwj-EKrqsE-e1UfY&psig=AOvVaw0sh4Q-5bmkz1jQ_tJGKkA7&ust=1687102225465000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJiaydnPyv8CFQAAAAAdAAAAABAE";
  //const id = "001";

  // like function
  function handleLike() {}

  // dislike function
  function handledisLike() {}

  return (
    <div>
      <h3>{name}</h3>
      {/* Carousel to swipe through pictures? */}
      <img src={link} />
      <ul class="removeBullets">
        <li>
          <label class="cardLabel" id="owner">
            <strong>Owner Name:</strong>
            {owner}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="breed">
            <strong>Breed:</strong>
            {breed}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="size">
            <strong>Size:</strong>
            {size}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="breed">
            <strong>Gender:</strong>
            {gender}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="breed">
            <strong>age:</strong>
            {age}
          </label>
        </li>
      </ul>

      {/* Like Button */}
      <button class="buttonCard" id="dislike" onClick={handledisLike}>
        No Paw
      </button>
      {/* Dislike Button */}
      <button class="buttonCard" id="like" onClick={handleLike}>
        Paw
      </button>
    </div>
  );
}
