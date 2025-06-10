import React from 'react';
import { Banner, Menu, Slider } from '../../components';

const Home = () => {
  return (
    <>
      <div className="w-full">
        <Menu />
      </div>
      <div className="banner-slider w-full flex justify-center gap-3 py-5">
        <div className="slider w-[30%] bg-slate-200">
          <Slider />
        </div>
        <div className="banner w-[70%] bg-gray-400">
          <Banner />
        </div>
      </div>
    </>
  );
};

export default Home;
