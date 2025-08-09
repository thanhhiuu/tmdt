/*eslint-disable-next-line*/
import React, { useEffect, useState } from 'react';
import icons from '../ultils/icons';
import * as apis from '../apis';
import { Link, NavLink } from 'react-router-dom';
import path from '../ultils/path';
const Slider = () => {
  const { GiHamburgerMenu } = icons;
  const [categories, setCategories] = useState([]);
  const fetchCategori = async () => {
    const reponse = await apis.apiGetCategories();
    setCategories(reponse);
  };
  console.log('caere', categories);
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

        <div className="categories flex flex-col gap-9 mt-3 px-5">
          {categories?.message?.map((elm) => (
            <Link
              key={elm?._id}
              to={`/${elm?.title.toLowerCase()}/${
                elm?._id
              }/${elm?.title.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? 'hover:text-colorNav p-3' : 'p-3 hover:text-colorNav'
              }
            >
              {elm?.title} ({elm?.brand?.length})
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
