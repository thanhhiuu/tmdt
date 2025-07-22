import React from 'react';
import { NavLink } from 'react-router-dom';
import { menu } from '../ultils/contants';
const Menu = () => {
  return (
    <>
      <div className=" w-main  h-[50px] flex items-center  justify-between px-[10px] border-b">
        <div className="menu   ">
          {menu.map((elm) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'pr-[60px] text-colorNav text-[14px]'
                    : 'pr-[60px] text-main text-[14px]'
                }
                key={elm.id}
                to={elm.path}
              >
                {elm.title}
              </NavLink>
            );
          })}
        </div>
        <div className="search">
          <input
            placeholder="search"
            className="border shadow-md text-[14px] w-[250px] focus:outline-none h-[25px] rounded-full  px-4"
          />
        </div>
      </div>
    </>
  );
};

export default Menu;
