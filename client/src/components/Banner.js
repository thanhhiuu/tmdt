import React from 'react';
import banner from '../assets/banner.jpg';
const Banner = () => {
  return (
    <>
      <div className="w-full h-full">
        <img
          className="object-contain h-[500px] w-full"
          src={banner}
          alt="Loading"
        />
      </div>
    </>
  );
};

export default Banner;
