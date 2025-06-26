import React from 'react';
import icons from '../../ultils/icons';
import { Link } from 'react-router-dom';
import path from '../../ultils/path';
const HeaderTop = () => {
  const { PiUserCheckLight } = icons;
  return (
    <>
      {' '}
      <div className="flex w-main items-center justify-between">
        <div className="cursor-pointer text-[12px] hover:text-white">
          ORDER ONLINE OR CALL US (+1800) 000 8808
        </div>
        <div className="flex justify-center items-center gap-2 text-[12px] ">
          <span className="cursor-pointer  hover:text-white">
            <Link to={path.LOGIN}> Sign In or Create Account</Link>
          </span>
          <span className="hover:text-white cursor-pointer ">
            <PiUserCheckLight />
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
