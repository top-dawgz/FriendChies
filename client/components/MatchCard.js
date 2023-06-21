import React from 'react';

export default function MatchCard(props) {
  // make an array of dummy data objects
  // loop through the array of objects and get data from each individual object
  const { name, age, breed, size, sex, owner, calendarLink } = props;

  // send calendar invite function - assign to the click property of the functions
  function sendInvite() {
    window.open(calendarLink)
    // alert('Calendar Invite Sent!');
  }
  // remove match function - assign to the click property of the functions
  function removeMatch() {
    // remove that card from the page - still need to add functionality
    // send a delete request to backend
    alert('Removed from Matches!');
  }
  return (
    <div>
      <img />
      <h3>{name}</h3>
      <ul className='removeBullets'>
        <li>
          <label className='breed'>
            <strong>Breed: </strong> {breed}
          </label>
        </li>

        <li>
          <label className='age'>
            <strong>Age: </strong>
            {age}
          </label>
        </li>

        <li>
          <label className='size'>
            <strong>Size: </strong>
            {size}
          </label>
        </li>

        <li>
          <label className='gender'>
            <strong>Gender: </strong>
            {sex}
          </label>
        </li>

        <li>
          <label className='owner'>
            <strong>Owner: </strong>
            {owner}
          </label>
        </li>
      </ul>

      {/* Send Calendar Invite */}
      <button className='buttonCard' id='sendInvite' onClick={sendInvite}>
        Send Calendar Invite
      </button>
      {/* Remove Match */}
      <button className='buttonCard' id='removeMatch' onClick={removeMatch}>
        Remove from Matches
      </button>
    </div>
  );
}
