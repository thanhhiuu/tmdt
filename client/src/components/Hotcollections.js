import React from 'react';
import { useSelector } from 'react-redux';

const Hotcollections = () => {
  const ProductCategories = useSelector((state) => state.app);
  return (
    <>
      <div>
        <div>
          {' '}
          <div className="text-[25px] h-[50px] font-bold border-b-2 border-b-[#B87331]">
            <span className="text-gray-700 text-[18px]">HOT COLLETSION</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between item-center py-5">
          {ProductCategories?.categories?.map((elm) => (
            <div
              key={elm._id}
              className="w-[380px] h-[250px] border flex justify-center items-center gap-4 mb-5 "
            >
              <div>
                <img src={elm?.image} alt="Not" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-main text-[14px]">
                  {' '}
                  {elm?.title}
                </span>
                <span className="py-1 text-main">
                  {elm?.brand?.map((elm) => (
                    <div key={elm} className=" text-[14px] py-1">
                      {'> ' + elm}
                    </div>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hotcollections;
