import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";

export default function MatchCard(props) {
  // make an array of dummy data objects
  // loop through the array of objects and get data from each individual object
  const { id, name, owner, calendarLink, src, setCurrentDog, removeMatch } =
    props;

  // send calendar invite function - assign to the click property of the functions
  function sendInvite() {
    window.open(calendarLink);
    // alert('Calendar Invite Sent!');
  }
  //flex items-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-indigo-600
  return (
    <li
      className="match-selection border-solid border-2 border-indigo-600"
      onClick={() => {
        setCurrentDog(id);
      }}
    >
      <div className="match-details-container">
        <img className="match-img" src={src} />
        <div className="match-names">
          <div id="match-pet">{name}</div>
          <div id="match-owner">{owner}</div>
        </div>
      </div>
      <div className="match-buttons">
        <button id="sendInvite" onClick={sendInvite}>
          <FontAwesomeIcon icon={faCalendar} />
        </button>
        <button id="removeMatch" onClick={() => removeMatch(id)}>
          <FontAwesomeIcon icon={faHeartCrack} color="red" />
        </button>
      </div>
    </li>
  );
}
