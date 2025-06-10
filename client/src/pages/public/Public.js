import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components';

const Public = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-main ">
        <div className="py-[35px] border-b">
          <Header />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
