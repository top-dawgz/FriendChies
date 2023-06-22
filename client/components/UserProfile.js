import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

export default function UserProfile({ dog }) {
  const [dogInfo, setDogInfo] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`/api/dogs/${dog}`);
        setDogInfo(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getProfile();
  }, [dog]);

  return (
    <div>
    <h1 className="text-2xl text-center m-3">Profile</h1>
      <Carousel interval={null} variant="dark">
        <Carousel.Item>
          <img className="flex items-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-indigo-600"
            src={dogInfo.img_src}
            alt='First Profile Pic'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="flex items-center active:bg-indigo-500 hover:bg-indigo-300 mr-2 rounded-md w-16 h-16 cursor-pointer border-solid border-2 border-indigo-600"
            src={dogInfo.img_src}
            alt='Second Profile Pic'
          />
        </Carousel.Item>
      </Carousel>
      
      <div className='match-names mt-2'>
        <h2>{dogInfo.name}</h2>
        <div className="mb-2" id='match-owner'>{dogInfo.owner}</div>
      </div>
      <div className='specs'>
        <strong htmlFor='age'>Age:</strong>
        <div id='age' className="mb-2">{dogInfo.age}</div>
        <strong htmlFor='age'>Breed:</strong>
        <div className="mb-2">{dogInfo.breed}</div>
        <strong htmlFor='age'>Gender:</strong>
        <div className="mb-2">{dogInfo.sex}</div>
        <strong htmlFor='age'>Size:</strong>
        <div className="mb-2">{dogInfo.size}</div>
      </div>
      <div className="match-description">
        <strong htmlFor='bio'>Bio:</strong><br />
        {dogInfo.about}
      </div>
    </div>
  );
}
