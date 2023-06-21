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
      <Carousel interval={null} variant="dark">
        <Carousel.Item>
          <img
            src={dogInfo.img_src}
            alt='First Profile Pic'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={dogInfo.img_src}
            alt='Second Profile Pic'
          />
        </Carousel.Item>
      </Carousel>
      
      <div className='match-names'>
        <h2>{dogInfo.name}</h2>
        <div id='match-owner'>{dogInfo.owner}</div>
      </div>
      <div className='container py-4 px-3 mx-auto'>
        <div>{dogInfo.age}</div>
        <div>{dogInfo.breed}</div>
        <div>{dogInfo.id}</div>
        <div>{dogInfo.owner}</div>
        <div>{dogInfo.sex}</div>
        <div>{dogInfo.size}</div>
      </div>
    </div>
  );
}
