import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Menu } from '../../components';
import HeaderTop from './HeaderTop';
import Foodter from './Foodter';

const Public = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full flex items-center justify-center bg-colorNav h-[40px] ">
        <HeaderTop />
      </div>
      <div className="w-main ">
        <div className="py-[35px] border-b">
          <Header />
        </div>
        <div className="w-full">
          <Menu />
        </div>
        <div>
          <Outlet />
        </div>
      </div>{' '}
      <div className="w-full">
        <Foodter />
      </div>
    </div>
  );
};

export default Public;
