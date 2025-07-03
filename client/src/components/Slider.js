/*eslint-disable-next-line*/
import React, { useEffect, useState } from 'react';
import icons from '../ultils/icons';
import * as apis from '../apis';
import { NavLink } from 'react-router-dom';
const Slider = () => {
  const { GiHamburgerMenu } = icons;
  const [categories, setCategories] = useState([]);
  const fetchCategori = async () => {
    const reponse = await apis.apiGetCategories();
    setCategories(reponse);
  };
  // console.log(categories);
  useEffect(() => {
    fetchCategori();
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="flex h-[50px] bg-blackmain justify-start items-center gap-5 px-5 ">
          <span>
            <GiHamburgerMenu fontSize={'16px'} className="text-white" />
          </span>
          <p className="text-[16px] text-white">ALL COLLECTIONS</p>
        </div>

        <div className="categories flex flex-col">
          {categories?.message?.map((elm) => (
            <NavLink
              key={elm._id}
              to={elm.slug}
              className={({ isActive }) =>
                isActive ? 'hover:text-colorNav p-3' : 'p-3 hover:text-colorNav'
              }
            >
              {elm.title}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
