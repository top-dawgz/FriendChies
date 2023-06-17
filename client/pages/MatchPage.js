import React from 'react';
import MatchCard from '../components/MatchCard.js';

export default function MatchPage() {
  const dummyArray = [
    {
      name: 'Lula',
      owner: 'Laura',
      zip: '10024',
      breed: 'Labrador Retriever',
      size: 'Medium',
      gender: 'Female',
      age: '5',
      calendarLink: 'https://calendar.google.com',
    },
    {
      name: 'Bingo',
      owner: 'Kelsey',
      zip: '10538',
      breed: 'Brittany Spaniel',
      size: 'Medium',
      gender: 'Male',
      age: '7',
      calendarLink: 'https://calendar.google.com',
    },
    {
      name: 'Blue',
      owner: 'Sylvia',
      zip: '10005',
      breed: 'Pitbull Mix',
      size: 'Large',
      gender: 'Male',
      age: '6',
      calendarLink: 'https://calendar.google.com',
    },
    {
      name: 'Quinn',
      owner: 'Hallory',
      zip: '91602',
      breed: 'Terrier Mix',
      size: 'Small',
      gender: 'Female',
      age: '5',
      calendarLink: 'https://calendar.google.com',
    },
    {
      name: 'Wally',
      owner: 'Tianna',
      zip: '98105',
      breed: 'Golden Retriever',
      size: 'Large',
      gender: 'Male',
      age: '1',
      calendarLink: 'https://calendar.google.com',
    },
  ];

  return (
    <div>
      <h2>Match Page</h2>
      {dummyArray.map((dogs, index) => (
        <MatchCard
          key={index}
          name={dogs.name}
          breed={dogs.breed}
          size={dogs.size}
          age={dogs.age}
          gender={dogs.gender}
          owner={dogs.owner}
          calendarLink={dogs.calendarLink}
        />
      ))}
    </div>
  );
}
