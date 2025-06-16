import React from 'react';
import { Banner, Menu, Slider, Bestsaller, Dailydeal } from '../../components';

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
      <div className="banner-slider w-full flex gap-3 py-5">
        <div className="slider w-[30%] bg-slate-200">
          <Dailydeal />
        </div>
        <div className="banner w-[70%] ">
          <Bestsaller />{' '}
          <div className="flex p-[12px] gap-6 ">
            <div className="group relative w-[390px]">
              <img
                src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                alt="Not"
                className="w-full"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
            </div>

            <div className="group relative w-[390px]">
              <img
                src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                alt="Not"
                className="w-full"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
