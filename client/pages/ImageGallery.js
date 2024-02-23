import React, { useEffect } from 'react';

const bucketBaseUrl = 'https://woofware-friendchies.s3.amazonaws.com/';

const ImageGallery = ({ imageKeys }) => {
  return (
    <div className="image-gallery">
      {imageKeys.map((key, index) => (
        <img key={index} src={`${bucketBaseUrl}${key}`} alt={`Gallery item ${index}`} />
      ))}
    </div>
  );
};

export default ImageGallery;
