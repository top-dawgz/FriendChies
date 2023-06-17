import React, { useState, useEffect } from "react";

import Card from "../components/Card.js";

export default function SwipePage() {
  const [dog, setDog] = useState();
  const [i, setI] = useState(0);

  useEffect(() => {
    fetch("URL", {
      method: "GET",
    })
      .then((data) => {
        data.json();
      })
      .then(setDog(data));
  }, []);

  function handleChangeDog() {
    setI(i + 1);
  }

  return (
    <div>
      <h3>Swipe Page</h3>
      <Card dogInf={dog[i]} />
    </div>
  );
}
