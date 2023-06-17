import React from "react";
export default function Card(props) {
  const { dogInf } = props;

  // like function
  function handleLike() {
    const data = { id: id, userId: userId };
    //send a post request to back end
    //fetch ('someURL', method:Post)
    fetch("URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json.stringify(data),
    })
      .then((data) => {
        data.json();
      })
      .then((response) => {
        console.log(data);
      })
      .catch((err) => {
        next({ err: { message: "match request unsuccessful " } });
      });
    //Invoke the parent function to update state of current dog
    handleChangeDog();
  }

  // dislike function
  function handleDislike() {
    //invoke the parent function to update
    handleChangeDog();
  }

  return (
    <div className="card">
      <h3>{dogInf.name}</h3>
      {/* Carousel to swipe through pictures? */}
      {/* <img className="swipeCardIm" src={link} /> */}
      <ul class="removeBullets">
        <li>
          <label class="cardLabel" id="owner">
            <strong>Owner Name:</strong>
            {dogInf.owner}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="breed">
            <strong>Breed:</strong>
            {dogInf.breed}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="size">
            <strong>Size:</strong>
            {dogInf.size}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="breed">
            <strong>Gender:</strong>
            {dogInf.gender}
          </label>
        </li>

        <li>
          <label class="cardLabel" id="breed">
            <strong>age:</strong>
            {dogInf.age}
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
